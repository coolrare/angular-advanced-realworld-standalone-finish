import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/post.service';
import { Article } from 'src/app/interfaces/article';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postService = inject(PostService);

  articles: Article[] = [];

  ngOnInit() {
    this.postService.getArticles().subscribe((result) => {
      this.articles = result.articles;
    });
  }
}
