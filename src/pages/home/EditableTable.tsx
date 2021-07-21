import React, {useContext, useState, useEffect, useRef, ReactNode} from 'react';
import {Table, Input, Button, Popconfirm, Form} from 'antd';
import {FormInstance} from 'antd/lib/form';
import {queryPOST} from "../../sytles/js/http"

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       title,
                                                       editable,
                                                       children,
                                                       dataIndex,
                                                       record,
                                                       handleSave,
                                                       ...restProps
                                                   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    name: string;
    url: string;
    comment: string;
    abc?: string
}

interface EntityType extends DataType {
    id: number;
}

interface EditableTableState {
    dataSource: DataType[];
    count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
    columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string; abc?: string })[];

    constructor(props: EditableTableProps) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '15%',
                editable: true,
            },
            {
                title: 'url',
                dataIndex: 'url',
                width: '45%',
                editable: true,
            },
            {
                title: 'comment',
                dataIndex: 'comment',
                width: '20%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                width: '20%',
                //@ts-ignore
                render: (_: any, record: { key: React.Key }, index: number) =>
                    this.state.dataSource.length >= 1 ? (
                        <>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <a>DELETE </a>
                            </Popconfirm>
                            , <a onClick={() => {
                            this.getURL(record.key)
                        }}>跳转</a>
                        </>
                    ) : null,

            },
        ];

        this.state = {
            dataSource: [
                {
                    key: '0',
                    name: 'name',
                    url: '32',
                    abc: 'asddddddddddddddd',
                    comment: 'London, Park Lane no. 0',
                },
                {
                    key: '1',
                    abc: 'asd',
                    name: 'Edward King 1',
                    url: '32',
                    comment: 'London, Park Lane no. 1',
                },
            ],
            count: 2,
        };
    }

    getURL = (key: React.Key) => {
        // console.log(key)
        const arr: Array<DataType> = this.state.dataSource.filter((value, index) => {
            // console.log(value['key'] == key +'')
            return value['key'] == key + '';
        });
        console.log(arr[0])
        window.open(arr[0].url);
        // return arr.length > 0 ? arr[0]['url'] : '#';
    };
    handleDelete = (key: React.Key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({dataSource: dataSource.filter(item => item.key !== key)});
        //向服务器删除
        queryPOST(`/urls/delete/${key}`, {}).then((response) => {
            // console.log(response)
            if (response != null) {
                console.log(response);
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        }).catch(reason => {
            console.log(reason);
        });
    };

    handleAdd = () => {
        const self = this;
        queryPOST(`/urls/add`, {}).then((response) => {
            // console.log(response)
            if (response != null) {
                console.log(response);
                console.log("添加成功");
                self.update();
            } else {
                console.log("添加失败");
            }
        }).catch(reason => {
            console.log(reason);
        });
    };

    handleSave = (row: DataType) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        let item = newData[index];
        //删除index的数据，并增加新项目items, deleteCount必需。要删除的项目数量。如果设置为 0，则不会删除项目--直接插入
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({dataSource: newData});
        //存到数据库
        const entity: EntityType = {...row, id: +row.key};
        console.log("entity ", entity);
        queryPOST("/urls/update", entity)
            .then((response) => {
                // console.log(response)
                if (response != null) {
                    console.log(response);
                    const b: boolean = response.data;
                    b ? console.log("successfully update!") : console.log("failed to update");
                } else {
                    alert("不正确！")
                };
            }).catch(reason => {
            // console.log(reason);
        });
        // console.log(row);
    };

    render() {
        console.log("editable render")
        const {dataSource} = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: DataType) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
                    Add a row
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns as ColumnTypes}
                />
            </div>
        );
    }

    componentDidMount = () => {
        this.update();
    }
    update = () => {
        const self = this;
        const {dataSource, count} = this.state;
        let newDataSource: Array<DataType> = [];
        console.log("editable did mount")
        queryPOST("/urls/all", {}).then((response) => {
            // console.log(response)
            if (response != null) {
                console.log(response);
                const temp = [...response.data];
                newDataSource = temp.map((value: EntityType, index: number) => {
                    value.key = value.id;
                    return value;
                })
                self.setState({
                    dataSource: [...newDataSource],
                    count: newDataSource.length,
                })
            } else {
                alert("账户或密码不正确！")
            }
        }).catch(reason => {
            console.log(reason);
            console.log("failed to get all urls")
        });
    }
}

export default EditableTable;

