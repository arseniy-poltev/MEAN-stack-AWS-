import { Component, Inject , OnInit} from '@angular/core';
import { from, Observable } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
import { ISasToken } from '../../models/azure-storage-blob';
import { AzureStorageBlobService } from '../../services/azure-storage-blob.service';
import { OrderService } from '../../services/order.service';
import { IOrder } from 'src/app/models/order.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface IUploadProgress {  
  filename: string;
  progress: number;
}

@Component({
  selector: 'app-image-order',
  templateUrl: './image-order.component.html',
  styleUrls: ['./image-order.component.css']
})
export class ImageOrderComponent implements OnInit {
  order: IOrder; 
  uploadProgress$: Observable<IUploadProgress>;
  filesSelected = false;
  fileNameError = false;
  visual:string;
  isLoaded = false;
  progressValue:number;

  constructor(
    public dialogRef: MatDialogRef<ImageOrderComponent>,
    public azureBlobService: AzureStorageBlobService,
    public orderClient: OrderService,    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.order = data.order; 
    this.visual = data.order.visual;  
  }
  
  ngOnInit(){
    document.getElementById('in-upload-img').click();
  }

  onFileSelected(event: any): void {    
    
    if(event.target.files[0].name.split('.')[0] == this.visual){
      this.filesSelected = true;
      this.fileNameError = false;
      this.uploadProgress$ = this.uploadFile(event.target.files[0]); 
    }else{
      this.fileNameError = true;
      this.filesSelected = false;
    }
    
  }

  uploadFile(file: File): Observable<IUploadProgress> {
    
    const accessToken: ISasToken = {
      container: 'images-' + this.order._id,
      filename: file.name,
      storageAccessToken:this.data.config.blobStorageAccesToken,
      storageUri: this.data.config.blobStorageContainer
    };
    
    return this.azureBlobService
      .uploadToBlobStorage(accessToken, file)
      .pipe(map(progress => this.mapProgress(file, progress)));
  } 
  
  private mapProgress(file: File, progress: number): IUploadProgress {
    this.progressValue = progress;
    if(progress == 100){
      this.isLoaded = true;
      console.log(this.order);
      this.order.image = this.data.config.blobStorageUrl + this.order._id + '-' + file.name,
      this.orderClient.update(this.data.token, this.data.config, this.order).subscribe((newOrder) => {          
        this.dialogRef.close();
      });
    }
    return {
      filename: file.name,
      progress: progress
    };
  }
}
