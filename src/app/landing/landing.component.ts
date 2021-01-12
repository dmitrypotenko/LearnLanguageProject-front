import {AfterViewInit, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {jarallax} from 'jarallax';
import {Meta, Title} from '@angular/platform-browser';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Learn hard';
  schema = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    'name': 'LessonsBox',
    'url': 'https://lessonsbox.com/',
    'address': '',
    'sameAs': [
      'https://www.facebook.com/LessonsBox',
      'https://twitter.com/LessonsBox'
    ]
  };

  constructor(private meta: Meta, private titleService: Title, private injector: Injector) {
  }

  ngOnInit() {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2,
      imgSrc: 'assets/rsz_parallax_new_york-compressed.jpg'
    });
    this.meta.updateTag({
      name: 'description',
      content: 'LessonsBox - The platform for learning and creation of English Courses. ' +
        'Here you can learn advanced grammar courses and also do tests and exercises to check your English knowledge. If you are an English teacher,' +
        'we offer a flexible platform for English lessons and tests creation.'
    });
    this.titleService.setTitle('LessonsBox - online platform for English learners and teachers.');

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    jarallax(document.querySelectorAll('.jarallax'), 'destroy');
  }
}
