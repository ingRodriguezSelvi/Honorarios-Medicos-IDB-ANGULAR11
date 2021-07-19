import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '@app/Services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    public data:DataService,
    @Inject(MAT_DIALOG_DATA) 
    public dialogRef: MatDialogRef<ContactComponent>
    ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

}
