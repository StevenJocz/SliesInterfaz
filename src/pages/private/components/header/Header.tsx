import { useState } from 'react';
import './Header.css';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, expandOutline, mailOutline, gridOutline } from 'ionicons/icons';
import { Notification } from '../notification';
import { Mail } from '../mail';
import { Grid } from '../grid';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { services } from '../../../../models';

const Header = () => {
  const [notification, setNotification] = useState(false);
  const [mail, setMail] = useState(false);
  const [grid, setGrid] = useState(false);
  const usuario = useSelector((store: AppStore) => store.user);
  

  const handleNotification = () => {
    setNotification(!notification);
    setMail(false);
    setGrid(false);
  };

  const handleMail = () => {
    setNotification(false);
    setMail(!mail);
    setGrid(false);
  };

  const handleGrid = () => {
    setNotification(false);
    setMail(false);
    setGrid(!grid);
  };

  return (
    <div className='Header'>
      <div className="Header_Iconos">
        <IonIcon className='icono' icon={gridOutline} onClick={handleGrid} />
        <IonIcon className='icono' icon={notificationsOutline} onClick={handleNotification} />
        <IonIcon className='icono' icon={mailOutline} onClick={handleMail} />
        <IonIcon className='icono' icon={expandOutline} />
      </div>
      <div className="Header_Perfil">
        <img src={`${services.url}/${usuario.foto}`} alt="" />
        <h2>{usuario.nombre}</h2>
      </div>
      {notification && <Notification />}
      {mail && <Mail />}
      {grid && <Grid />}
    </div>
  );
};

export default Header;
