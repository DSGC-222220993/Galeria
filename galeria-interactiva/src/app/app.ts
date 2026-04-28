import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para el formulario
import { Foto } from './foto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  private storageKey = 'galeria-interactiva-fotos';

  // Lista inicial de fotos
  fotos: Foto[] = [];

  // Variables para el formulario
  nuevoTitulo = '';
  nuevaUrl = '';
  mostrarError = false;
  mostrarSuccess = false;
  successMessage = '';
  private mensajeTimerId?: number;

  constructor() {
    this.cargarFotos();
  }

  private cargarFotos() {
    const datosGuardados = localStorage.getItem(this.storageKey);
    if (datosGuardados) {
      try {
        this.fotos = JSON.parse(datosGuardados) as Foto[];
      } catch {
        this.fotos = this.getFotosIniciales();
        this.guardarFotos();
      }
    } else {
      this.fotos = this.getFotosIniciales();
      this.guardarFotos();
    }
  }

  private getFotosIniciales(): Foto[] {
    return [
      { id: 1, titulo: 'Music in the City', url: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=500&fit=crop', likes: 0 },
      { id: 2, titulo: 'Diseño', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop', likes: 5 }
    ];
  }

  private guardarFotos() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.fotos));
  }

  // 1. Agregar Foto
  agregarFoto() {
    if (this.nuevoTitulo && this.nuevaUrl) {
      const nueva: Foto = {
        id: Date.now(),
        titulo: this.nuevoTitulo,
        url: this.nuevaUrl,
        likes: 0
      };
      this.fotos.push(nueva);
      this.guardarFotos();
      this.nuevoTitulo = '';
      this.nuevaUrl = '';
      this.mostrarError = false;
      this.showSuccessMessage('Imagen agregada correctamente');
    } else {
      this.showErrorMessage();
    }
  }

  private showSuccessMessage(message: string) {
    this.clearMessageTimer();
    this.successMessage = message;
    this.mostrarSuccess = true;
    this.mostrarError = false;
    this.mensajeTimerId = window.setTimeout(() => {
      this.mostrarSuccess = false;
      this.mostrarError = false;
    }, 5000);
  }

  private showErrorMessage() {
    this.clearMessageTimer();
    this.mostrarError = true;
    this.mostrarSuccess = false;
    this.mensajeTimerId = window.setTimeout(() => {
      this.mostrarError = false;
    }, 5000);
  }

  private clearMessageTimer() {
    if (this.mensajeTimerId !== undefined) {
      window.clearTimeout(this.mensajeTimerId);
      this.mensajeTimerId = undefined;
    }
  }

  // 2. Dar Like
  darLike(id: number) {
    const foto = this.fotos.find(f => f.id === id);
    if (foto) {
      foto.likes++;
      this.guardarFotos();
    }
  }

  // 3. Eliminar
  eliminarFoto(id: number) {
    this.fotos = this.fotos.filter(f => f.id !== id);
    this.guardarFotos();
  }

  scrollCarousel(direction: number) {
    const track = document.querySelector('.carousel-track') as HTMLElement | null;
    if (!track) return;

    const cardWidth = track.querySelector('.photo-card')?.clientWidth ?? 320;
    track.scrollBy({
      left: direction * (cardWidth + 20),
      behavior: 'smooth'
    });
  }

  // 4. Contador Total (Computed)
  get totalLikes() {
    return this.fotos.reduce((acc, foto) => acc + foto.likes, 0);
  }
}