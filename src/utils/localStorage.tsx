export async function getLocal() {
    return await JSON.parse(localStorage.getItem('employees') || '[]')
}

export async function setLocal(employees: any) {
    localStorage.setItem('employees', JSON.stringify(employees))
}
