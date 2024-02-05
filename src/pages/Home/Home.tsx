import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import { PaySlip } from '../../utils/types';
import { paySlips } from '../../utils/constants';
import { VirtualList } from '../../components/VirtualList/VirtualList';

const Home: React.FC = () => {

  //LOCAL STATE
  const [list, setList] = useState<Array<PaySlip>>([...paySlips]);
  // const list = useMemo(() => paySlips, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color={'light'}>
          <IonTitle>Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={'light'} style={{paddingBottom: '100px'}}>
        {/* <IonHeader collapse="condense">
          <IonToolbar color={'light'}>
            <IonTitle size="large">Payslips</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <VirtualList items={list} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
