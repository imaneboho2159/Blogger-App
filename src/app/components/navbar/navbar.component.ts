import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <!-- Top Bar: Logo and Navigation -->
        <div class="flex justify-between items-center">
          <!-- Logo and Site Name -->
          <div class="flex items-center space-x-3">
            <img
              src="assets/images/logo.png"
              alt="Logo"
              class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
         
          </div>


          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <a
              routerLink="/"
              class="text-white font-medium hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </a>
            <a
              routerLink="/login"
              class="text-white font-medium hover:text-blue-200 transition-colors duration-200"
            >
              Login
            </a>
            <button
              (click)="logout()"
              class="text-white font-medium hover:text-red-400 transition-colors duration-200"
            >
              Logout
            </button>
          </div>


          <!-- Mobile Menu Button -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden text-white focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>


        <!-- Mobile Menu (Hidden by Default) -->
        <div
          *ngIf="isMobileMenuOpen"
          class="md:hidden mt-4 flex flex-col space-y-2 bg-blue-700 rounded-lg p-4"
        >
          <a
            routerLink="/"
            class="text-white font-medium hover:text-blue-200 transition-colors duration-200 py-2"
          >
            Home
          </a>
          <a
            routerLink="/login"
            class="text-white font-medium hover:text-blue-200 transition-colors duration-200 py-2"
          >
            Login
          </a>
          <button
            (click)="logout()"
            class="text-white font-medium hover:text-red-400 transition-colors duration-200 py-2 text-left"
          >
            Logout
          </button>
        </div>
      </div>


      <!-- Categories Scrollable Row -->
      <div class="bg-white py-3 shadow-inner">
        <div class="container mx-auto px-4">
          <div class="flex space-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-100">
            <button
              *ngFor="let category of categories"
              class="px-5 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-sm font-medium text-blue-700 whitespace-nowrap transition-colors duration-200"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      /* Custom scrollbar for Webkit browsers */
      .scrollbar-thin {
        scrollbar-width: thin;
        scrollbar-color: #2563eb #f3f4f6;
      }
      .scrollbar-thin::-webkit-scrollbar {
        height: 8px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 4px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background: #2563eb;
        border-radius: 4px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #1d4ed8;
      }
    `,
  ],
})
export class NavbarComponent {
  categories = ['Sport', 'Politics', 'Technology', 'Economy', 'Culture'];
  isMobileMenuOpen = false;


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  logout() {
    console.log('User logged out!');
    // Future: authService.logout();
  }
}
