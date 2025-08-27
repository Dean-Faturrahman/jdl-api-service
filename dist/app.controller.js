"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("./auth/decorator/public.decorator");
let AppController = class AppController {
    getComingSoonPage() {
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Coming Soon</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap" rel="stylesheet">
          <style>
              body {
                  background-color: #111;
                  color: #eee;
                  font-family: 'Fira Code', monospace;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  overflow: hidden;
              }
              .container {
                  font-size: 4vw;
                  font-weight: 500;
              }
              .cursor {
                  display: inline-block;
                  background-color: #00ff7f; /* Warna kursor: spring green */
                  animation: blink .8s infinite;
                  width: 0.8ch; /* Lebar kursor agar seperti blok */
                  height: 1em;
                  vertical-align: middle;
              }
              /* Animasi kursor berkedip */
              @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
              }
          </style>
      </head>
      <body>
          <div class="container">
            <span id="text"></span><span class="cursor"></span>
          </div>

          <script>
              const textElement = document.getElementById('text');
              const textArray = [
                  "Coming Soon...",
                  "We're building something amazing.",
                  "Stay tuned."
              ];
              let arrayIndex = 0;
              let charIndex = 0;
              let isDeleting = false;
              const typingSpeed = 120;
              const deletingSpeed = 60;
              const delayBetweenTexts = 2000;

              function type() {
                  const currentText = textArray[arrayIndex];
                  let displayedText = '';

                  if (isDeleting) {
                      // Proses menghapus
                      displayedText = currentText.substring(0, charIndex - 1);
                      charIndex--;
                  } else {
                      // Proses mengetik
                      displayedText = currentText.substring(0, charIndex + 1);
                      charIndex++;
                  }

                  textElement.textContent = displayedText;

                  let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

                  if (!isDeleting && charIndex === currentText.length) {
                      // Selesai mengetik, tunggu lalu mulai hapus
                      typeSpeed = delayBetweenTexts;
                      isDeleting = true;
                  } else if (isDeleting && charIndex === 0) {
                      // Selesai menghapus, lanjut ke teks berikutnya
                      isDeleting = false;
                      arrayIndex++;
                      if (arrayIndex >= textArray.length) {
                          arrayIndex = 0;
                      }
                  }

                  setTimeout(type, typeSpeed);
              }

              window.onload = function() {
                  if (textArray.length) {
                      setTimeout(type, 500);
                  }
              };
          </script>
      </body>
      </html>
    `;
    }
};
exports.AppController = AppController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getComingSoonPage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map