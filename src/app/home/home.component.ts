import {HostListener, Component, OnInit,Renderer2, ElementRef } from '@angular/core';
import { ApiServices } from '../Data-Services/ApiServices';
declare var jquery:any;
interface teamObject{
  name:string,
  image:string,
  id:number,
  details:string
}
interface testObject
{
  name:string,
  id:number,
  image:string,
}
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
public teamData:teamObject[]=[];
public testsList:testObject[]=[];
public persons:teamObject;
public testData:testObject;
public modalWidth :number = window.innerWidth/2;
public modalHeight:number = window.innerHeight/2;
public openTestModal:boolean = false;
public isTermAndCondtionChecked=false;
isTestEnable:boolean=false;
public openModal:boolean=false;
selectedMenu:string="home";
  constructor(private rd: Renderer2,private httpservice:ApiServices,private el:ElementRef) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
   if(this.openModal)
   {
    this.modalHeight = window.innerHeight*.50;
    this.modalWidth =  ((window.innerWidth*.60)>500)?(window.innerWidth*.60):400;
   }
   else if(this.openTestModal)
   {
    this.modalHeight = window.innerHeight*.80;
    this.modalWidth =  ((window.innerWidth*.90)>500)?(window.innerWidth*.90):400;
   }

  }
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    if(window.pageYOffset>80)
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
    this.httpservice.getJSON("team").subscribe((data :any)=> {
      this.teamData = data.teams;
      this.testsList = data.Tests;
            },
      error=> { 
              console.log("Error in recieving data");     
  });
  }
  openDetail(id:number)
  {
    document.documentElement.style.overflow = 'hidden';
    this.modalWidth =  ((window.innerWidth*.60)>500)?(window.innerWidth*.60):320;
    console.log(this.modalHeight +" "+this.modalWidth);
    this.persons =  this.teamData.find(x=>x.id == id);
    this.openModal = true;

  }
  closeDetails()
  {
    document.documentElement.style.overflow = 'scroll';
    this.openModal = false;
  }
  openTest(id:number)
  {
    document.documentElement.style.overflow = 'hidden';
    this.modalHeight =(window.innerHeight*.80);
    this.modalWidth =  ((window.innerWidth*.90)>500)?(window.innerWidth*.90):320;
    this.testData =  this.testsList.find(x=>x.id == id);
    this.openTestModal = true;

  }
  closeTest()
  {
    document.documentElement.style.overflow = 'scroll';
    this.openTestModal = false;
  }
  termAndConditionChange()
  {
    this.isTermAndCondtionChecked = !this.isTermAndCondtionChecked;
  }
  continueToTest()
  {
    if(this.isTermAndCondtionChecked)
    {
      this.isTestEnable = true;
    }
    else
    {
      alert("Please accept terms and condition");
    }
  }
  ScrollToTarget(menu:string,scrolltoel:string)
  {
    this.selectedMenu = menu;
    let el = document.getElementById(scrolltoel);
  el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    
   //el.scrollIntoView();
  }
}
