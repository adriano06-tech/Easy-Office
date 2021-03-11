function copyProfileEmail(){
    const profileEmailCopy = document.getElementById('copy_profile_email')
    profileEmailCopy.select()
    document.execCommand('copy')
    setTimeout(()=>{alert('Email copiado!')}, 100)
}

function copyProfileTel(){
    const profileTelCopy = document.getElementById('copy_profile_tel')
    profileTelCopy.select()
    document.execCommand('copy')
    setTimeout(()=>{alert('Número copiado!')}, 100)
}