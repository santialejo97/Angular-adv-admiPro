interface Campo {
  titulo: string;
  url: string;
}

export interface Menu {
  title: string;
  icon: string;
  submenu: Campo[];
}
