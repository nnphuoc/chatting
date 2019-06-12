$('#btn-login').click(function(){
    login($('#input-username').val(), $('#input-password').val());
});

async function login (username, password) {
    try {
        const loginResponse = await axios({
            method: 'post',
            url: 'http://localhost:5555/login',
            data: {
                username,
                password
            }
        });
        localStorage.setItem('auth', JSON.stringify(loginResponse.data.result));
        const [user, groups] = await Promise.all([
            getUserLogin(loginResponse.data.result.token, loginResponse.data.result.user),
            getListGroup(loginResponse.data.result.token)
        ]);
        // const user = await axios({
        //     method: 'get',
        //     url: `http://localhost:5555/user/${loginResponse.data.result.user}`,
        //     headers: {
        //         Authorization: 'Bearer ' + loginResponse.data.result.token
        //     }
        // });
        console.log(user.data.result);
        if (user.data.result) {
            localStorage.setItem('user', JSON.stringify(user.data.result));
            // await getListGroup(loginResponse.data.result.token);
            $('#main').css({ display: 'block' });
            setElement(true);
            $('#name').html(user.data.result.name);
            $('#modal-login').modal('hide');
        }
        if (groups.data.result.data && groups.data.result.data.length > 0) {
            for (let i =0, len = groups.data.result.data.length; i < len; i++) {
                let group = groups.data.result.data[i];
                $('#list-group').append(`
                    <div id="${group._id}" class="group">
                        <img src="./images/user.png" />
                        <div class="info">
                            <p>${group.name || 'No name'}</p>
                            <span>${group.lastMessage && group.lastMessage.content ? group.lastMessage.content : ''}</span>
                        </div>
                    </div>
            `);
            }
        }
    } catch (e) {
        alert(e.response.data.errors[0].code);
        throw e;
    }
}

$('#login').click(()=>{
    $('#modal-login').modal('show');
});

async function getListGroup(token) {
    try {
        return await axios({
            method: 'get',
            url: `http://localhost:5555/groups`,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    } catch (e) {
        alert(e.response.data.errors[0].code);
        throw e;
    }
};

async function getUserLogin(token, id) {
    try {
        console.log(token, id);
        return await axios({
            method: 'get',
            url: `http://localhost:5555/user/${id}`,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    } catch (e) {
        alert(e.response.data.errors[0].code);
        throw e;
    }
};