import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  fotos: Foto[] = [];

  nuevoTitulo = '';
  nuevaUrl = '';
  mostrarError = false;
  mostrarSuccess = false;
  successMessage = '';
  mostrarConfirmacion = false;
  fotoAEliminar: number | null = null;
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
      { id: 1, titulo: 'Patrick witch star', url: 'https://i.pinimg.com/736x/b6/1b/bb/b61bbb4053b5ba3c1dd2927b38134723.jpg', likes: 6 },
      { id: 2, titulo: 'Flores amarillas', url: 'https://i.pinimg.com/1200x/05/2d/5d/052d5db977fd926afbc97b4bf8edc47a.jpg', likes: 7 }
    ];
  }

  private guardarFotos() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.fotos));
  }

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

  darLike(id: number) {
    const foto = this.fotos.find(f => f.id === id);
    if (foto) {
      foto.likes++;
      this.guardarFotos();
    }
  }

  eliminarFoto(id: number) {
    this.fotoAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    if (this.fotoAEliminar !== null) {
      this.fotos = this.fotos.filter(f => f.id !== this.fotoAEliminar);
      this.guardarFotos();
      this.showSuccessMessage('Foto eliminada exitosamente');
      this.mostrarConfirmacion = false;
      this.fotoAEliminar = null;
    }
  }

  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.fotoAEliminar = null;
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

  get totalLikes() {
    return this.fotos.reduce((acc, foto) => acc + foto.likes, 0);
  }
}