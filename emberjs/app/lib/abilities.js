const defaultRate = [0,1,2,3,4,5,6,7,8,9,10];

const abilities = [
    {
        id:'html',
        name: 'HTML',
        rate: defaultRate,
        source: '/assets/images/html_5.png'
    },{
        id:'css',
        name: 'CSS',
        rate: defaultRate,
        source: '/assets/images/css_3.png'
    },{
        id:'js',
        name: 'Javascript',
        rate: defaultRate,
        source: '/assets/images/js.png'
    },{
        id:'python',
        name: 'Python',
        rate: defaultRate,
        source: '/assets/images/python.png',
        direction: 'horizontal'
    },{
        id:'django',
        name: 'Django',
        rate: defaultRate,
        source: '/assets/images/django.png',
        direction: 'horizontal'
    },{
        id:'ios',
        name: 'iOS',
        rate: defaultRate,
        source: '/assets/images/ios.png',
        direction: 'horizontal'
    },{
        id:'android',
        name: 'Android',
        rate: defaultRate,
        source: '/assets/images/android.png'
    }
];

export default abilities;