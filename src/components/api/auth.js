import axios from 'axios';
axios.defaults.withCredentials = true;




export async function onGetBugComments() {
    return await axios.get('/api/dashboard/get-bug-comments')
}


export async function onGetUsers() {
    return await axios.get('api/dashboard/get-users')
}

export async function onLogout() {
    return await axios.get('/api/logout')
}

export async function fetchProtectedInfo() {
    return await axios.get('/api/protected')
}


export async function onNewProject(data) {
    return await axios.post('/api/dashboard/new-project', data)
}

export async function onNewBug(data) {
    return await axios.post('/api/dashboard/new-bug', data)
}


export async function onRegistration(registrationData) {
    return await axios.post('/api/register', registrationData)
}

export async function onLogin(loginData) {
    return await axios.post('/api/login', loginData)
}

export async function onUpdateEmail(data) {
    return await axios.put('/api/dashboard/update-email', data)
}

export async function onUpdateUserPassword(data) {
    return await axios.put('/api/dashboard/update-password', data)
}

export async function onAddBugComment(data) {
    return await axios.post('/api/dashboard/add-bug-comment', data);
}

export async function onRemoveBug(data) {
    return await axios.delete(`/api/dashboard/posts/${data}`)
}

export async function onDeleteComment(data) {
    return await axios.delete(`/api/dashboard/delete-comment/${data}`)
}

export async function onDeleteProject(data) {
    return await axios.delete(`/api/dashboard/delete-project/${data}`)
}

