let u_agent = window.navigator.userAgent.toLowerCase()

let phone_list = ['android', 'ipad', 'iphone'];

for(let i = 0; i<phone_list.length; i++) {
    if(u_agent.match(phone_list[i])) {
        location.replace('m.index.html')
    }
} 