import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '../components/toast/toast.component';

export const libModule = [
];
export const libDirective = [];
export const baseComponent = [ToastComponent];

@NgModule({
  declarations: [...baseComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...libModule,
    ...libDirective,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...libModule,
    ...libDirective,
    ...baseComponent
  ],
})
export class SharedModule { }
