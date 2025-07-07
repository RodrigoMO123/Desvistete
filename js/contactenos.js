        // Función para mostrar el cuadro de mensaje personalizado (reemplazo de alert)
        function showMessageBox(message) {
            const messageBox = document.getElementById('customMessageBox');
            const messageBoxText = document.getElementById('messageBoxText');
            const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');

            messageBoxText.textContent = message;
            messageBox.classList.add('show');

            messageBoxCloseBtn.onclick = () => {
                messageBox.classList.remove('show');
            };

            messageBox.onclick = (event) => {
                if (event.target === messageBox) {
                    messageBox.classList.remove('show');
                }
            };
        }

        document.addEventListener('DOMContentLoaded', () => {
            // 1. Navegación Responsive (menú hamburguesa)
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navToggle.setAttribute(
                        'aria-expanded',
                        navMenu.classList.contains('active')
                    );
                });

                // Cerrar el menú al hacer clic en un enlace (útil en móviles)
                navMenu.querySelectorAll('.nav-menu-link').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            navToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
            }

            // 5. Manejo del formulario de Novedades (sección CTA inferior)
            // Se mantiene el HTML de la sección CTA, pero la lógica de suscripción
            // del modal "Únete a Nuestra Élite" ha sido eliminada de esta página.
            const ctaForm = document.querySelector('.cta-form');
            if (ctaForm) {
                ctaForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Evita que el formulario se envíe
                    const emailInput = ctaForm.querySelector('input[type="email"]');
                    showMessageBox(`¡GRACIAS por unirte a la comunidad Vístete con el correo: ${emailInput.value}! Prepárate para recibir noticias de vanguardia.`);
                    emailInput.value = ''; // Limpiar el campo
                });
            }

            // 7. Animación de desplazamiento suave para anclas
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // 8. Lógica del Pop-up Modal de Suscripción (ELIMINADO PARA ESTA PÁGINA)
            // El modal de suscripción y su lógica han sido retirados de contactenos.html
            // para que solo aparezca en la página principal.
            const newsletterModal = document.getElementById('newsletterModal');
            if (newsletterModal) { // Asegura que el código no falle si el modal no existe
                newsletterModal.remove(); // Elimina el elemento del DOM si existe
            }


            // 9. Lógica del Modal de Detalles del Producto
            const productDetailsModal = document.getElementById('productDetailsModal');
            const productDetailsCloseBtn = productDetailsModal.querySelector('.product-details-modal-close-btn');
            const modalProductImage = document.getElementById('modalProductImage');
            const modalProductName = document.getElementById('modalProductName');
            const modalProductPrice = document.getElementById('modalProductPrice');
            const modalProductAvailability = document.getElementById('modalProductAvailability');
            const modalProductCode = document.getElementById('modalProductCode');
            const modalProductType = document.getElementById('modalProductType');
            const modalProductVendor = document.getElementById('modalProductVendor');
            const modalProductSizes = document.getElementById('modalProductSizes');
            const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
            const increaseQuantityBtn = document.getElementById('increaseQuantity');
            const productQuantityInput = document.getElementById('productQuantity');
            const addToCartFullBtn = productDetailsModal.querySelector('.add-to-cart-full-btn');

            let selectedSize = ''; // Para almacenar la talla seleccionada

            // Dummy product data for the product details modal
            // This data would typically come from a product catalog or API
            const dummyProductData = {
                id: 'prod001',
                name: 'Zapatilla Urbana "Estilo"',
                price: 120.00,
                image: 'https://placehold.co/400x400/cccccc/333333?text=Producto', // Placeholder image
                description: 'Una zapatilla cómoda y con estilo para el día a día en la ciudad.',
                availability: 'En Stock',
                code: 'ZU-E001',
                type: 'Zapatilla Casual',
                vendor: 'Vístete',
                sizes: ['38', '39', '40', '41', '42', '43']
            };

            // Función para mostrar el modal de detalles del producto (no se llama directamente en esta página,
            // pero se mantiene por si se enlaza desde otras partes o futuras características)
            function showProductDetailsModal(product) {
                modalProductImage.src = product.image;
                modalProductName.textContent = product.name;
                modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
                modalProductAvailability.textContent = product.availability;
                modalProductCode.textContent = product.code;
                modalProductType.textContent = product.type;
                modalProductVendor.textContent = product.vendor;

                // Limpiar y cargar tallas
                modalProductSizes.innerHTML = '';
                product.sizes.forEach(size => {
                    const sizeOption = document.createElement('span');
                    sizeOption.classList.add('size-option');
                    sizeOption.textContent = size;
                    sizeOption.addEventListener('click', () => {
                        // Remover 'selected' de todas las opciones y añadirlo a la actual
                        modalProductSizes.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                        sizeOption.classList.add('selected');
                        selectedSize = size; // Guardar la talla seleccionada
                    });
                    modalProductSizes.appendChild(sizeOption);
                });

                productQuantityInput.value = 1; // Resetear cantidad a 1
                selectedSize = ''; // Resetear talla seleccionada

                productDetailsModal.style.display = 'flex';
                setTimeout(() => {
                    productDetailsModal.classList.add('active');
                }, 50);
            }

            productDetailsCloseBtn.addEventListener('click', () => {
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            productDetailsModal.addEventListener('click', (event) => {
                if (event.target === productDetailsModal) {
                    productDetailsModal.classList.remove('active');
                    setTimeout(() => {
                        productDetailsModal.style.display = 'none';
                    }, 300);
                }
            });

            // Control de cantidad en el modal de detalles
            decreaseQuantityBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(productQuantityInput.value);
                if (currentQuantity > 1) {
                    productQuantityInput.value = currentQuantity - 1;
                }
            });

            increaseQuantityBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(productQuantityInput.value);
                productQuantityInput.value = currentQuantity + 1;
            });

            // Añadir al carrito desde el modal de detalles (simulado)
            addToCartFullBtn.addEventListener('click', () => {
                const productName = modalProductName.textContent;
                const quantity = productQuantityInput.value;
                const sizeInfo = selectedSize ? ` (Talla: ${selectedSize})` : '';

                showMessageBox(`"${productName}" x ${quantity}${sizeInfo} ha sido añadido al carrito. (Simulado)`);

                // Cerrar el modal después de añadir al carrito
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            // Manejo del formulario de contacto
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Evita el envío real del formulario

                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;

                    // Aquí iría la lógica para enviar el formulario, por ejemplo, a un backend.
                    // Por ahora, solo mostraremos un mensaje de éxito.
                    showMessageBox(`¡Gracias, ${name}! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.`);

                    // Limpiar el formulario
                    contactForm.reset();
                });
            }
        });