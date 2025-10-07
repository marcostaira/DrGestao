// backend/src/modules/whatsapp/whatsapp.queue.ts

export class WhatsAppQueue {
  private queue: string[] = [];
  private processing: boolean = false;

  addToQueue(mensagemId: string): void {
    if (!this.queue.includes(mensagemId)) {
      this.queue.push(mensagemId);
      console.log(
        `Mensagem ${mensagemId} adicionada à fila. Total na fila: ${this.queue.length}`
      );
    }
  }

  removeFromQueue(mensagemId: string): void {
    const index = this.queue.indexOf(mensagemId);
    if (index > -1) {
      this.queue.splice(index, 1);
      console.log(
        `Mensagem ${mensagemId} removida da fila. Total na fila: ${this.queue.length}`
      );
    }
  }

  getNext(): string | null {
    if (this.queue.length === 0) {
      return null;
    }
    return this.queue[0];
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  clearQueue(): void {
    this.queue = [];
    console.log("Fila limpa");
  }

  isProcessing(): boolean {
    return this.processing;
  }

  setProcessing(status: boolean): void {
    this.processing = status;
  }
}
