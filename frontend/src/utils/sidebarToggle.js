export const  handleSidebarToggle = async (sidebar) =>  {
    sidebar.preventDefault();
    document.querySelector('.main-container').classList.toggle('sidebar-closed');
    document.querySelector('.main-container').classList.toggle('sbar-open');
    document.querySelector('.overlay').classList.toggle('show');
    document.querySelector('html,body').classList.toggle('sidebar-noneoverflow');
}

export const handleOverlayDismiss = async () => {
    if (window.innerWidth < 1200) {
        document.querySelector('.main-container').classList.add('sidebar-closed');
        document.querySelector('.main-container').classList.remove('sbar-open');
        document.querySelector('.overlay').classList.remove('show');
        document.querySelector('html,body').classList.remove('sidebar-noneoverflow');
    }
}

export const  handleSidebarTopToggle = async (sidebar) =>  {
    sidebar.preventDefault();
    document.querySelector('.main-container').classList.toggle('sidebar-closed');
    document.querySelector('.main-container').classList.toggle('sbar-open');
    document.querySelector('.overlay').classList.toggle('show');
    document.querySelector('html,body').classList.toggle('sidebar-noneoverflow');
}

export const handleOverlayTopDismiss = async () => {
    if (window.innerWidth < 1200) {
        document.querySelector('.main-container').classList.add('sidebar-closed');
        document.querySelector('.main-container').classList.remove('sbar-open');
        document.querySelector('.overlay').classList.remove('show');
        document.querySelector('html,body').classList.remove('sidebar-noneoverflow');
    }
}