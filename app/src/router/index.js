import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TunerView from '../views/TunerView.vue';
import RangeFinderView from '../views/RangeFinderView.vue';
import StudioView from '../views/StudioView.vue';
import ReportView from '../views/ReportView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import ProfileView from '../views/ProfileView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Beranda' } },
  { path: '/studio', name: 'studio', component: StudioView, meta: { title: 'DAW Studio' } },
  { path: '/report', name: 'report', component: ReportView, meta: { title: 'Rapor Analisis Vokal' } },
  { path: '/tuner', name: 'tuner', component: TunerView, meta: { title: 'Chromatic Tuner' } },
  { path: '/range-finder', name: 'range-finder', component: RangeFinderView, meta: { title: 'Vocal Range Finder' } },
  { path: '/analytics', name: 'analytics', component: AnalyticsView, meta: { title: 'Analytics & Arsip Vokal' } },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { title: 'Profil Akustik Vokal' } },
  { path: '/login', name: 'login', component: LoginView, meta: { title: 'Masuk Akun' } },
  { path: '/register', name: 'register', component: RegisterView, meta: { title: 'Daftar Akun' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Studio'} — VocalSense AI`;
  next();
});

export default router;