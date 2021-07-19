let indexModule = (function(){
    let $baseBox = $('.baseBox'),
		$baseBoxText = $baseBox.find('span'),
		$baseBoxSingout = $baseBox.find('a'),
		$menuBox = $('.menuBox'),
		$navBoxList = $('.navBox>a'),
		$itemBoxList = null,
        $iframeBox = $('.iframeBox');
    
    //基于发布订阅管理我们获取到个人信息和权限信息后要处理的事情
    let $plan = $.Callbacks();
    let time = null;
    //显示欢迎的基本信息
    $plan.add((power,baseInfo)=>{
        // console.log("power",power);
        // let powerArr = power.split('|');
        // console.log(powerArr);
        // let i = "userhandle";
        // if(i in powerArr)console.log(1);
        // console.log("baseInfo",baseInfo);
        time = new Date();
        time = /(\d{2}):\d{2}/.exec(time)[1];
        if(time <= 10){
            time = "早上";
        }else if(time <= 14){
            time = "中午";
        }else if(time <= 18){
            time = "下午";
        }else{
            time = "晚上";
        };
        $baseBoxText.html(`${time}好！${baseInfo.name || ""}`);

        $baseBoxSingout.click(async ()=>{
            let result = await axios.get('/user/signout');
            if(parseInt)
            console.log(result);
        })
    });

    return {
        async init(){
            // 1.验证当前用户是否登录
            let result = await axios.get('/user/login');
            console.log(result);
            if (result.code != 0) {
                // 未登录
                alert('小主，您还没有登录哦，请您先登录~~');
                window.location.href = 'login.html';
                return;
            };

            //2.获取登录用户的权限信息和个人信息(AJAX并行):
            let [power, baseInfo] = await axios.all([
                axios.get('/user/power'),
                axios.get('/user/info')
            ]);
            power.code == 0 ? power = power.power : null;
            baseInfo.code == 0 ? baseInfo = baseInfo.data : null;

            //3.通知计划表中的人物执行
            $plan.fire(power,baseInfo);
        }
    }
})();
indexModule.init();