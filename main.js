const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const electron = require('electron');
const path = require('path');
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;
let appTray = null;
function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // 当 window 被关闭，这个事件会被触发。
  win.on('close', (event) => {
      win.hide();
      event.preventDefault();
  });
  win.on('closed', () => {
    win = null;
    appTray = null;
  })
  // 加载index.html文件
  isDev
      ? win.loadURL('http://localhost:3000/')
      : win.loadFile('./client/build/index.html');

  // 打开开发者工具
  if(isDev) {
    win.webContents.openDevTools();
  }

  const Menu = electron.Menu;
  const Tray = electron.Tray;
  //系统托盘右键菜单
  const trayMenuTemplate = [
    {
        label: '设置',
        click: function () {
          win.hide()
        } //打开相应页面
    },
    {
        label: '帮助',
        click: function () {}
    },
    {
        label: '关于',
        click: function () {}
    },
    {
        label: '退出',
          click: function () {
            // 退出窗口
            app.quit();
            // 销毁托盘图标
            appTray.destroy();
          }
    }
  ];

  //系统托盘图标目录
  trayIcon = path.join(__dirname, 'asset');//app是选取的目录

  appTray = new Tray(path.join(trayIcon, '5dd2877940a35.256px.ico'));//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('我的托盘图标');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click',function(){
    win.isVisible() ? win.hide() : win.show();
  })
}




// 接受来自渲染进程的消息
ipcMain.on('minimizeWindow',() => {
  win.minimize();
});
ipcMain.on('hideWindow',() => {
  win.hide();
})
// 新开子窗口
ipcMain.on('newWindow', (windowName) => {
  const newwin = new BrowserWindow({
    width: 600, 
    height: 400,
    // 不带顶部操作类
    frame: false,
    // 设置是否可操作父窗口
    modal: true,
    parent: win, //win是主窗口
})
  newwin.loadURL('http://localhost:3000/')
  //newwin.loadURL(path.join('file:',__dirname,'new.html')); //new.html是新开窗口的渲染进程
  newwin.on('closed',() => { newwin = null })
})
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。