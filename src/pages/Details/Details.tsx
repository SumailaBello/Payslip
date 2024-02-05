import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonProgressBar, IonRow, IonSpinner, IonText, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { PaySlip } from '../../utils/types';
import {downloadOutline, closeCircleOutline, openOutline, ribbonOutline, personOutline, cashOutline, calendarOutline} from 'ionicons/icons';
import { FileDownload, FileDownloadProgress, FileDownloadResponse } from "capacitor-plugin-filedownload";
import { useState } from 'react';
import { FileOpener } from '@capacitor-community/file-opener';

const Details: React.FC = (props) => {
    //ROUTER HOOKS
    const location = useLocation();
    const router = useIonRouter();
    const paySlip: PaySlip = location.state as PaySlip;

    //IONIC HOOKS
    const [presentAlert, dismissAlert] = useIonAlert();

    //LOCAL STATE
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadedFile, setDownloadedFile] = useState<FileDownloadResponse | null>(null);

    // LIFECYCLE HOOKS
    useIonViewWillLeave(()=> {
        FileDownload.cancel();
    })

    useIonViewDidEnter(()=> {
        routeBack();
    })
    
    const routeBack = ()=> {
        if(!paySlip) router.goBack();
    }

    // download file to device
    const download = async (redownload?: boolean) => {
        if(redownload) {
            confirmRedownload();
        }
        else {
            setIsDownloading(true);
            try {
                await FileDownload.addListener('downloadProgress', handleDownloadProgress);
                const res = await FileDownload.download({
                    url: paySlip.file,
                    fileName: paySlip.name.split(" ").join("_") + new Date().toLocaleDateString().split("/").join("") + '.pdf',
                    // headers for http request with POST method
                    headers: {},
                    // parameter for http request with POST method
                    body: {},
                })
                setIsDownloading(false);
                setDownloadedFile(res);
                console.log(res);
                //on ios, the promise resolves with an undefined value for res when download is cancelled by user
                //we handle the bug with the below code
                if(!res) {
                    presentAlert('Download cancelled');
                    return
                }
                presentAlert('Download Completed', [
                    {
                        text: 'Close',
                        role: 'destructive'
                    },
                    {
                        text: 'Open file',
                        handler: ()=> {
                            openFile(res);
                        },
                    },
                ])
            } 
            catch (err) {
                console.log(err);
                setIsDownloading(false);
                //cancelling on android throws an error that returns the below error string so we check for that to prevent displaying the
                //wrong error message to user in the alert popup
                if(err == 'Error: download fail: stream was reset: CANCEL') return
                presentAlert('An error occured while downloading file')
            }
        }
    }

    //confirm redownload
    const confirmRedownload = async ()=> {
        await presentAlert('Do you want to redownload file?', [
            {
                text: 'No',
                role: 'destructive'
            },
            {
                text: 'Download',
                handler: ()=> {
                    download();
                },
            },
        ])
    }

    // dispplays/handles download progress
    const handleDownloadProgress = (progress: FileDownloadProgress) => {
        // console.log(progress);
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
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Payslip Details</IonTitle>
                    {downloadedFile && (
                        <IonButton size='small' fill='clear' slot='end' onClick={()=> openFile(downloadedFile as FileDownloadResponse)}>
                            <IonIcon icon={openOutline} />
                        </IonButton>
                    )}
                    {isDownloading && (
                        <IonProgressBar type='determinate' value={downloadProgress / 100}></IonProgressBar>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color={'light'}>
                <div style={{height: '100%', display: 'flex', alignItems: 'center'}} data-testid="cypress-details">
                    <IonCard style={{width: '100%'}}>
                        <IonCardContent>
                            <IonItem lines='full' data-testid="cypress-ref-item">
                                <IonIcon size="small" icon={ribbonOutline} slot='start' color='medium' />
                                <IonLabel data-testid="cypress-ref-label">
                                    <IonText color={'primary'}><small>Reference</small></IonText>  
                                    <br />
                                    {paySlip?.id}
                                </IonLabel>
                            </IonItem>
                            <IonItem lines='full' data-testid="cypress-name-item">
                                <IonIcon size="small" icon={personOutline} slot='start' color='medium' />
                                <IonLabel data-testid="cypress-name-label">
                                    <IonText color={'primary'}><small>Name</small></IonText>
                                    <br />
                                    {paySlip?.name}
                                </IonLabel>
                            </IonItem>
                            <IonItem lines='full' data-testid="cypress-amount-item">
                                <IonIcon size="small" icon={cashOutline} slot='start' color='medium' />
                                <IonLabel data-testid="cypress-amount-label">
                                    <IonText color={'primary'}><small>Amount</small></IonText>
                                    <br />
                                    ${paySlip?.amount}
                                </IonLabel>
                            </IonItem>
                            <IonItem lines='full' data-testid="cypress-deductions-item">
                                <IonIcon size="small" icon={cashOutline} slot='start' color='medium' />
                                <IonLabel data-testid="cypress-amount-label">
                                    <IonText color={'primary'}><small>Deductions</small></IonText> 
                                    <br />
                                    ${paySlip?.deductions}
                                </IonLabel>
                            </IonItem>
                            <IonItem lines='full' data-testid="cypress-from-item">
                                <IonIcon size="small" icon={calendarOutline} slot='start' color='medium' />
                                <IonLabel data-testid="cypress-amount-label">
                                    <IonText color={'primary'}><small>From</small></IonText> 
                                    <br />
                                    {paySlip?.fromDate.toLocaleDateString()}
                                </IonLabel>
                            </IonItem>
                            <IonItem lines='full' data-testid="cypress-to-item">
                                <IonIcon size="small" icon={calendarOutline} slot='start' color='medium' />
                                <IonLabel data-testid="cypress-amount-label">
                                    <IonText color={'primary'}><small>To</small></IonText> 
                                    <br />
                                    {paySlip?.toDate.toLocaleDateString()}
                                </IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
            <IonFooter slot='bottom' className='ion-no-border' data-testid="cypress-footer">
                <IonToolbar className='ion-padding' color={'light'}>
                {isDownloading ? (
                    <IonButton color={'danger'} expand='block' onClick={cancelDownload}>
                        <IonIcon size='small' icon={closeCircleOutline}></IonIcon>
                        <IonText className='ion-margin-start'>
                            Cancel Download
                        </IonText>
                    </IonButton>
                ) : (
                    <IonButton expand='block' data-testid="cypress-download-btn"
                        onClick={()=> download(downloadedFile ? true : false)} 
                        disabled={isDownloading} className='ion-margin-top'>
                            <IonIcon icon={downloadOutline} color='light' />
                            <IonText color={'light'} className='ion-margin-start'>
                                Download
                            </IonText>
                    </IonButton>  
                )}
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Details;