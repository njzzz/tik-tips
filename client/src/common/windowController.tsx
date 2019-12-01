const { ipcRenderer } = window.require('electron');
export const minimizeWindow = () => {
    ipcRenderer.send('minimizeWindow');
}
export const hideWindow = () => {
    ipcRenderer.send('hideWindow');
}
export const closeWindow = () => {
    ipcRenderer.send('closeWindow');
}
export const openNewWindow = (name: string) => {
   ipcRenderer.send('newWindow', name);
}