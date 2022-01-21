import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.css']
})
export class SettingsViewComponent implements OnInit {

  form = new FormGroup({
    iterations: new FormControl(''),
    binaryTrees: new FormControl(''),
    nBody: new FormControl(''),
    spectralNorm: new FormControl(''),
    fasta: new FormControl(''),
  });

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.get().subscribe(settings => {
      this.form.setValue(settings);
    });
    this.form.valueChanges.subscribe(change => {
      let nullFlag = false;
      for(let c in change){
        if(change[c]==null || change[c]==0){
          nullFlag = true;
        }
      }
      if(!nullFlag){
        this.settingsService.set(this.form.getRawValue()).subscribe()
      }
    })
  }

}
