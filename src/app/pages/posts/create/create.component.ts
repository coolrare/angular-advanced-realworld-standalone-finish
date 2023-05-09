import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { CreateArticle } from 'src/app/interfaces/create-article';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  postService = inject(PostService);

  post = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]),
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
    if (this.post.invalid) {
      return;
    }
    const article: CreateArticle = {
      title: this.post.value.title!,
      description: this.post.value.description!,
      body: this.post.value.description!,
      tagList: (this.post.value.tags || [])
        .map((tag) => tag || '')
        .filter((tag) => !!tag),
    };
    this.postService.createArticle(article).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
