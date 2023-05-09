import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  formBuilder = inject(FormBuilder);

  post = this.formBuilder.group({
    title: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control(''),
    tags: this.formBuilder.array([
      this.formBuilder.control('Angular'),
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
    ]),
  });

  addTag(tag: string) {
    if (tag) {
      this.post.controls.tags.push(this.formBuilder.control(tag));
    }
  }

  removeTag(index: number) {
    this.post.controls.tags.removeAt(index);
  }

  createPost() {
    console.log(this.post.value);
  }
}
