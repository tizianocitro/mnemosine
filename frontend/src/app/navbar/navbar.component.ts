import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { homeUrl } from '../consts/consts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;
  public homeUrl: string = homeUrl;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToGroups() {
    this.router.navigate(['/groups']);
  }

  goToAllAccounts() {
    this.router.navigate(['/all-accounts']);
  }

}
