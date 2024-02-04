import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonProgressBar, IonRow, IonSpinner, IonText, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { PaySlip } from '../../utils/types';
import {downloadOutline, closeCircleOutline} from 'ionicons/icons';
import { FileDownload, FileDownloadProgress, FileDownloadResponse } from "capacitor-plugin-filedownload";
import { useState } from 'react';
// import '@capacitor-comunity/';
// import { CapacitorHttp } from '@capacitor/core';
import { FileOpener } from '@capacitor-community/file-opener';
import { CreateAnimation, Animation } from '@ionic/react';

const Details: React.FC = (props) => {
    //ROUTER HOOKS
    const location = useLocation();
    const paySlip: PaySlip = location.state as PaySlip;

    //IONIC HOOKS
    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentLoader, dismissLoader] = useIonLoading();

    //LOCAL STATE
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadedFile, setDownloadedFile] = useState<FileDownloadResponse | null>(null);

    // lifecycle hook
    useIonViewWillLeave(()=> {
        FileDownload.cancel();
    })
    

    const download = async () => {
        setIsDownloading(true);
        try {
            await FileDownload.addListener('downloadProgress', handleDownloadProgress);
            const res = await FileDownload.download({
                url: paySlip.fileSrc,
                fileName: paySlip.name.split(" ").join("") + new Date().toLocaleDateString().split("/").join("") + '.pdf',
                // headers for http request with POST method
                headers: {},
                // parameter for http request with POST method
                body: {},
                // only works on Android, deprecated since 1.0.6
                downloadTitle: 'Downloading Payslip',
                // only works on Android, deprecated since 1.0.6
                downloadDescription: 'file is downloading',
            })
            setIsDownloading(false);
            setDownloadedFile(res);
            console.log(res);
            presentAlert('Download Completed', [
                {
                    text: 'Close',
                    role: 'destructive'
                },
                {
                    text: 'Open File',
                    handler: ()=> {
                        openFile(res);
                    },
                },
            ])
        } 
        catch (err) {
            console.log(err);
            setIsDownloading(false);
            presentAlert('An error occured while downloading file')
        }
    }

    // dispplays download progress
    const handleDownloadProgress = (progress: FileDownloadProgress) => {
        console.log(progress);
        setDownloadProgress(progress.progress);
    }

    // open file after downloading
    const openFile = async (resFile: FileDownloadResponse) => {
        await FileOpener.open({
            filePath: resFile.path
        })
    }   
    
    //cancel download
    const cancelDownload = async ()=> {
       await FileDownload.cancel();
       presentAlert('Download cancelled');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    {/* <IonButton slot='start'>
                        <IonIcon icon={} />
                    </IonButton> */}
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Payslip Details</IonTitle>
                </IonToolbar>
                {
                    isDownloading || downloadedFile && (
                        <CreateAnimation
                            duration={1000}
                            fromTo={{
                                property: 'opacity',
                                fromValue: '0.3',
                                toValue: '1'
                            }}
                        >
                            <IonToolbar>
                                <IonRow  className='ion-align-items-center'>
                                    <IonCol size='10' className='ion-align-items-center'>
                                        <IonProgressBar type='determinate' value={downloadProgress / 100}></IonProgressBar>
                                    </IonCol>
                                    {
                                        isDownloading && (
                                            <IonCol size='2'>
                                                <IonButton color={'transparent'} size='small' onClick={cancelDownload}>
                                                    <IonIcon color='danger' size='large' icon={closeCircleOutline}></IonIcon>
                                                </IonButton>
                                            </IonCol>
                                        )
                                    }
                                    {
                                        isDownloading && (
                                            <IonCol size='2'>
                                                <IonButton color={'transparent'} size='small'>
                                                    <IonIcon color='danger' size='large' icon={closeCircleOutline}></IonIcon>
                                                </IonButton>
                                            </IonCol>
                                        )
                                    }
                                </IonRow>
                            </IonToolbar>
                        </CreateAnimation>
                    )
                }
            </IonHeader>
            <IonContent className="ion-padding" color={'light'}>
                <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                    <IonCard style={{width: '100%'}}>
                        <IonCardContent>
                            <IonItem>
                                <IonLabel>
                                    <IonText color={'medium'}>Reference</IonText>  
                                    <br />
                                    {paySlip?.id}
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText color={'medium'}>Name</IonText>
                                    <br />
                                    {paySlip?.name}
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText color={'medium'}>Amount</IonText>
                                    <br />
                                    ${paySlip?.amount}
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText color={'medium'}>Deductions</IonText> 
                                    <br />
                                    ${paySlip?.deductions}
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText color={'medium'}>From</IonText> 
                                    <br />
                                    {paySlip?.fromDate.toLocaleDateString()}
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText color={'medium'}>To</IonText> 
                                    <br />
                                    {paySlip?.toDate.toLocaleDateString()}
                                </IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
            <IonFooter slot='bottom' className='ion-no-border'>
                <IonToolbar className='ion-padding' color={'light'}>
                    <IonButton expand='block' onClick={download} disabled={isDownloading}>
                        {isDownloading ? (
                            <IonSpinner color={'light'} name='lines-small' />
                        ) : (
                          <>
                            <IonIcon icon={downloadOutline} color='light' />
                            <IonText color={'light'} className='ion-margin-start'>
                                Download
                            </IonText>
                          </>  
                        )}
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Details;