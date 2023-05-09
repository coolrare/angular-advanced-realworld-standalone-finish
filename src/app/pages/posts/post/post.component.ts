import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  route = inject(ActivatedRoute);
  postService = inject(PostService);

  article?: Article;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id') || ''),
        switchMap((id) => this.postService.getArticle(id))
      )
      .subscribe((result) => {
        this.article = result.article;
      });
  }
}
