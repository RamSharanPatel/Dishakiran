import {HostListener, Component, OnInit,Renderer2 } from '@angular/core';
declare var jquery:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public fixMenu:boolean=false;
public newsToogle:boolean=true;
public careerToogle:boolean=true;
public contactToogle:boolean=true;
public innerwidth:any=window.innerWidth;
public isCollapseEnable:boolean = false;
  constructor(private rd: Renderer2) { }
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //  this.innerwidth = window.innerWidth;
  //  if(this.innerwidth<=540)
  //  {
  //    this.newsToogle = this.careerToogle = this.contactToogle = false;
  //   this.isCollapseEnable = true;
  //   alert("alert(cha)");
  //  } 
  //  else
  //  {
  //   this.newsToogle = this.careerToogle = this.contactToogle = true;
  //   this.isCollapseEnable = false;
    
  //  }
  // }
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    if(window.pageYOffset>150)
    {
      this.fixMenu = true;
    }
    else
    {
      this.fixMenu = false;
    }
  }
  collapseExpand(sectionName:string)
  {
    if(this.isCollapseEnable)
    {
      switch(sectionName)
      {
        case 'news':
          {
            this.newsToogle =!this.newsToogle;
            break;
          }
          case 'career':
          {
            this.careerToogle =!this.careerToogle;
            break;
          }
          case 'contact':
          {
            this.contactToogle =!this.contactToogle;
            break;
          }
  
      }
    }
    
  }
  ngOnInit(): void {
   
  }

}
