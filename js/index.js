// main.js
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

            // 2. Lógica del Carrusel del Banner Principal (ahora cada 7 segundos)
            const heroSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
            const totalHeroSlides = heroSlides.length;
            let currentHeroSlide = 0;
            let heroSlideInterval;

            function showHeroSlide(index) {
                heroSlides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
            }

            function nextHeroSlide() {
                currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
                showHeroSlide(currentHeroSlide);
            }

            function prevHeroSlide() {
                currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
                showHeroSlide(currentHeroSlide);
            }

            function startHeroSlideShow() {
                heroSlideInterval = setInterval(nextHeroSlide, 7000); // Rotación cada 7 segundos
            }

            function stopHeroSlideShow() {
                clearInterval(heroSlideInterval);
            }

            const heroLeftArrow = document.querySelector('.hero-carousel .carousel-arrow-left');
            const heroRightArrow = document.querySelector('.hero-carousel .carousel-arrow-right');

            if (heroLeftArrow && heroRightArrow) {
                heroLeftArrow.addEventListener('click', () => {
                    stopHeroSlideShow();
                    prevHeroSlide();
                    startHeroSlideShow();
                });

                heroRightArrow.addEventListener('click', () => {
                    stopHeroSlideShow();
                    nextHeroSlide();
                    startHeroSlideShow();
                });
            }

            showHeroSlide(currentHeroSlide);
            startHeroSlideShow();


            // 3. Lógica del Carrusel de Productos Destacados (Bucle Infinito)
            const productsCarouselTrack = document.querySelector('.products-carousel-track');
            const productsLeftArrow = document.querySelector('.products-carousel-nav-left');
            const productsRightArrow = document.querySelector('.products-carousel-nav-right');

            const productsData = [
                {
                    id: 'prod001',
                    name: 'Bota Táctica "Apex"',
                    price: 249.99,
                    image: 'img/jpg/zapato7.jpg',
                    description: 'Diseñadas para terrenos extremos, máxima tracción y resistencia a la abrasión. Perfectas para la aventura.',
                    availability: 'En Stock',
                    code: 'BT-A001',
                    type: 'Bota Táctica',
                    vendor: 'Vístete',
                    sizes: ['38', '39', '40', '41', '42', '43']
                },
                {
                    id: 'prod002',
                    name: 'Runner de Ciudad "Dash"',
                    price: 139.50,
                    image: 'img/jpg/zapato8.jpg',
                    description: 'Ultraligeras y con amortiguación adaptable, ideales para conquistar el asfalto urbano con estilo y velocidad.',
                    availability: 'En Stock',
                    code: 'RC-D002',
                    type: 'Zapatilla Deportiva',
                    vendor: 'Vístete',
                    sizes: ['36', '37', '38', '39', '40', '41']
                },
                {
                    id: 'prod003',
                    name: 'Zapatilla Casual "Forge"',
                    price: 99.00,
                    image: 'img/jpg/zapato9.jpg',
                    description: 'Confeccionadas con materiales de primera calidad, ofrecen una comodidad inigualable y un diseño minimalista. Versatilidad para el día a día.',
                    availability: 'En Stock',
                    code: 'ZC-F003',
                    type: 'Zapatilla Casual',
                    vendor: 'Vístete',
                    sizes: ['39', '40', '41', '42', '43', '44']
                },
                {
                    id: 'prod004',
                    name: 'Botín Urbano "Vanguard"',
                    price: 180.00,
                    image: 'img/jpg/zapato10.jpg',
                    description: 'La combinación perfecta de robustez y elegancia. Ideales para el entorno urbano que exige resistencia y distinción.',
                    availability: 'Últimas Unidades',
                    code: 'BU-V004',
                    type: 'Botín Urbano',
                    vendor: 'Vístete',
                    sizes: ['40', '41', '42', '43', '44', '45']
                },
                {
                    id: 'prod005',
                    name: 'Zapatos Oxford "Clásico Elite"',
                    price: 165.00,
                    image: 'img/jpg/zapato11.jpg',
                    description: 'Diseño atemporal con un toque moderno. Perfecto para ocasiones formales y profesionales.',
                    availability: 'En Stock',
                    code: 'ZO-CE05',
                    type: 'Zapato Formal',
                    vendor: 'Vístete',
                    sizes: ['39', '40', '41', '42', '43']
                },
                {
                    id: 'prod006',
                    name: 'Sandalias Deportivas "Hydro"',
                    price: 75.00,
                    image: 'img/jpg/zapato12.jpg',
                    description: 'Ligeras, transpirables y de secado rápido. Ideales para el verano y actividades acuáticas.',
                    availability: 'En Stock',
                    code: 'SD-H006',
                    type: 'Sandalia',
                    vendor: 'Vístete',
                    sizes: ['36', '37', '38', '39', '40']
                }
            ];

            function createProductCarouselCard(product) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card-carousel');
                productCard.dataset.productId = product.id;

                productCard.innerHTML = `
                    <div class="product-card-carousel-img-container">
                        <img src="${product.image}" alt="${product.name}">
                        <span class="product-price-tag">$${product.price.toFixed(2)}</span>
                        <div class="product-actions-overlay">
                            <button class="action-icon-btn favorite-btn" aria-label="Añadir a favoritos">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="action-icon-btn cart-btn" aria-label="Añadir al carrito">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button class="action-icon-btn view-details-btn" aria-label="Ver detalles">
                                <i class="fas fa-search-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-card-carousel-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                `;
                return productCard;
            }

            let productScrollPosition = 0;
            const productCardWidth = 350 + 40; // Ancho de la tarjeta + gap

            function setupInfiniteProductCarousel() {
                productsCarouselTrack.innerHTML = '';
                // Duplicar los productos suficientes veces para asegurar el "loop" visual
                const numCopies = 3; // Mostrar al menos 3 copias de los productos
                for (let j = 0; j < numCopies; j++) {
                    productsData.forEach(product => {
                        productsCarouselTrack.appendChild(createProductCarouselCard(product));
                    });
                }
                // Ajustar la posición inicial para que parezca un bucle continuo
                productScrollPosition = productsData.length * productCardWidth; // Posicionarse al inicio de la segunda "copia"
                productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;
                productsCarouselTrack.style.transition = 'none'; // Desactivar transición para el salto inicial

                // Re-activar la transición después de un breve momento
                setTimeout(() => {
                    productsCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }

            setupInfiniteProductCarousel();

            productsRightArrow.addEventListener('click', () => {
                productScrollPosition += productCardWidth;
                productsCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;

                // Si se desplaza más allá de la primera copia completa de los productos originales,
                // "resetea" la posición del scroll de forma instantánea para simular el bucle.
                if (productScrollPosition >= (productsData.length * productCardWidth * 2)) {
                    setTimeout(() => {
                        productsCarouselTrack.style.transition = 'none';
                        productScrollPosition = productsData.length * productCardWidth;
                        productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;
                    }, 500); // Coincide con la duración de la transición CSS
                }
            });

            productsLeftArrow.addEventListener('click', () => {
                productScrollPosition -= productCardWidth;
                productsCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;

                // Si se desplaza antes del inicio de la segunda copia de los productos originales,
                // "salta" al final de la segunda copia para simular el bucle.
                if (productScrollPosition < productsData.length * productCardWidth) {
                    setTimeout(() => {
                        productsCarouselTrack.style.transition = 'none';
                        productScrollPosition = (productsData.length * productCardWidth * 2) - productCardWidth; // Ir al final de la segunda copia
                        productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;
                    }, 500);
                }
            });


            // 4. Lógica de la Sección de Categorías (Draggable e Infinite Loop con Auto-scroll)
            const categoriesCarouselContainer = document.querySelector('.categories-carousel-container');
            const categoriesCarouselTrack = document.querySelector('.categories-carousel-track');
            let categoryCards = Array.from(document.querySelectorAll('.category-card-draggable')); // Get original cards

            const categoriesData = [
                { name: 'FASHION', url: 'productos.html?category=fashion' },
                { name: 'SPRING', url: 'productos.html?category=spring' },
                { name: 'FESTIVAL', url: 'productos.html?category=festival' },
                { name: 'SEASON', url: 'productos.html?category=season' },
                { name: 'URBAN', url: 'productos.html?category=urban' },
                { name: 'LUXE', url: 'productos.html?category=luxe' }
            ];

            // Duplicar elementos para el bucle infinito
            const numOriginalCategoryCards = categoryCards.length;

            // Clonar y añadir al final (para desplazamiento hacia la derecha)
            for (let i = 0; i < numOriginalCategoryCards; i++) {
                const clone = categoryCards[i].cloneNode(true);
                categoriesCarouselTrack.appendChild(clone);
            }
            // Clonar y añadir al principio (para desplazamiento hacia la izquierda)
            for (let i = numOriginalCategoryCards - 1; i >= 0; i--) {
                const clone = categoryCards[i].cloneNode(true);
                categoriesCarouselTrack.insertBefore(clone, categoriesCarouselTrack.firstChild);
            }

            // Actualizar la lista de categoryCards para incluir todos los elementos en el track (clones + originales)
            categoryCards = Array.from(categoriesCarouselTrack.children);

            let isDraggingCategories = false;
            let startPosCategories = 0;
            let currentTranslateCategories = 0;
            let prevTranslateCategories = 0;
            let startXCategories; // Para detectar clicks vs. drags
            let draggedCategories = false; // Flag to indicate if a drag occurred

            // Calcular el ancho de una sola tarjeta y el espacio
            const getCategoryCardDimensions = () => {
                const card = categoryCards[0];
                if (!card) return { width: 0, gap: 0, totalWidth: 0 };
                const style = getComputedStyle(categoriesCarouselTrack);
                const gap = parseFloat(style.getPropertyValue('gap') || '0px');
                const width = card.offsetWidth;
                return { width, gap, totalWidth: width + gap };
            };

            let categoryCardTotalWidth = getCategoryCardDimensions().totalWidth;

            // Posicionamiento inicial para mostrar el conjunto original de tarjetas
            // El track ahora tiene 'numOriginalCategoryCards' elementos clonados al principio.
            // Así que el translate inicial debe ser negativo de su ancho total.
            currentTranslateCategories = -numOriginalCategoryCards * categoryCardTotalWidth;
            prevTranslateCategories = currentTranslateCategories;
            setCategoriesCarouselPosition();

            // Recalcular dimensiones en el cambio de tamaño de la ventana
            window.addEventListener('resize', () => {
                categoryCardTotalWidth = getCategoryCardDimensions().totalWidth;
                // Reajustar la posición para mantener el estado visual después del cambio de tamaño
                // Esto asegura que el carrusel se mantenga en la vista correcta
                currentTranslateCategories = -numOriginalCategoryCards * categoryCardTotalWidth;
                prevTranslateCategories = currentTranslateCategories;
                setCategoriesCarouselPosition();
                // Reiniciar el auto-slide para asegurar que esté sincronizado con las nuevas dimensiones
                startCategorySlideShow();
            });


            categoriesCarouselTrack.addEventListener('mousedown', (e) => {
                isDraggingCategories = true;
                startPosCategories = e.clientX;
                startXCategories = e.clientX;
                categoriesCarouselTrack.style.transition = 'none'; // Desactivar la transición durante el arrastre
                stopCategorySlideShow(); // Detener el auto-slide en interacción del usuario
            });

            categoriesCarouselTrack.addEventListener('mouseleave', () => {
                if (isDraggingCategories) {
                    isDraggingCategories = false;
                    categoriesCarouselTrack.style.transition = 'transform 0.5s ease-out'; // Reactivar transición
                    snapToNearestCategorySlide();
                    startCategorySlideShow(); // Reiniciar auto-slide
                }
            });

            categoriesCarouselTrack.addEventListener('mouseup', () => {
                isDraggingCategories = false;
                categoriesCarouselTrack.style.transition = 'transform 0.5s ease-out'; // Reactivar transición
                snapToNearestCategorySlide();
                // Reiniciar el auto-slide con un pequeño retraso para asegurar que el usuario haya terminado la interacción
                setTimeout(() => {
                    startCategorySlideShow();
                }, 100); // Pequeño retraso
            });

            categoriesCarouselTrack.addEventListener('mousemove', (e) => {
                if (!isDraggingCategories) return;
                const currentPosition = e.clientX;
                const diff = currentPosition - startPosCategories;
                currentTranslateCategories = prevTranslateCategories + diff;

                // Detectar si es un arrastre (si se movió más de 5 píxeles)
                if (Math.abs(diff) > 5) {
                    draggedCategories = true;
                } else {
                    draggedCategories = false;
                }

                setCategoriesCarouselPosition();
            });

            function setCategoriesCarouselPosition() {
                categoriesCarouselTrack.style.transform = `translateX(${currentTranslateCategories}px)`;
            }

            function snapToNearestCategorySlide() {
                // Calcular los límites del conjunto original de tarjetas dentro del track extendido
                const originalSetStartBoundary = -numOriginalCategoryCards * categoryCardTotalWidth;
                const originalSetEndBoundary = 0; // El final del conjunto original (justo antes de los clones del final)

                // Si se arrastró más allá del final del conjunto original (hacia la derecha)
                if (currentTranslateCategories > originalSetEndBoundary) {
                    // Saltar instantáneamente al inicio del conjunto original (visualmente)
                    currentTranslateCategories -= numOriginalCategoryCards * categoryCardTotalWidth;
                    categoriesCarouselTrack.style.transition = 'none'; // Sin transición para el salto
                    setCategoriesCarouselPosition();
                    // Forzar un reflow para asegurar que 'transition: none' tenga efecto antes de re-habilitar la transición
                    void categoriesCarouselTrack.offsetWidth;
                }
                // Si se arrastró más allá del inicio del conjunto original (hacia la izquierda)
                else if (currentTranslateCategories < originalSetStartBoundary - (numOriginalCategoryCards * categoryCardTotalWidth)) {
                    // Saltar instantáneamente al final del conjunto original (visualmente)
                    currentTranslateCategories += numOriginalCategoryCards * categoryCardTotalWidth;
                    categoriesCarouselTrack.style.transition = 'none'; // Sin transición para el salto
                    setCategoriesCarouselPosition();
                    // Forzar un reflow
                    void categoriesCarouselTrack.offsetWidth;
                }

                // Después de un posible salto, ajustar al slide lógico más cercano
                const targetIndex = Math.round(currentTranslateCategories / categoryCardTotalWidth);
                prevTranslateCategories = targetIndex * categoryCardTotalWidth;
                currentTranslateCategories = prevTranslateCategories;
                setCategoriesCarouselPosition();
                categoriesCarouselTrack.style.transition = 'transform 0.5s ease-out'; // Re-habilitar la transición para el ajuste
            }

            // Carrusel automático para "Encuentra Tu Estilo"
            let categoriesSlideInterval;
            let currentCategorySlide = 0; // Esto representa el índice dentro del conjunto *original* de tarjetas

            function showCategoriesCarouselSlide(index) {
                // Calcular la posición objetivo relativa al inicio del conjunto original
                const targetPosition = -numOriginalCategoryCards * categoryCardTotalWidth - (index * categoryCardTotalWidth);
                currentTranslateCategories = targetPosition;
                prevTranslateCategories = currentTranslateCategories;
                setCategoriesCarouselPosition();
            }

            function nextCategoryCarouselSlide() {
                currentCategorySlide++;
                // Si el índice va más allá del conjunto original, reiniciarlo para un bucle visual
                if (currentCategorySlide >= numOriginalCategoryCards) {
                    currentCategorySlide = 0;
                    // Salto instantáneo de vuelta al inicio del conjunto original (visualmente)
                    categoriesCarouselTrack.style.transition = 'none';
                    currentTranslateCategories = -numOriginalCategoryCards * categoryCardTotalWidth;
                    setCategoriesCarouselPosition();
                    // Forzar un reflow para asegurar que 'transition: none' tenga efecto antes de re-habilitar la transición
                    void categoriesCarouselTrack.offsetWidth;
                    categoriesCarouselTrack.style.transition = 'transform 0.5s ease-out'; // Re-habilitar la transición
                }
                showCategoriesCarouselSlide(currentCategorySlide);
            }

            function startCategorySlideShow() {
                stopCategorySlideShow(); // Limpiar cualquier intervalo existente
                categoriesSlideInterval = setInterval(nextCategoryCarouselSlide, 4000); // Auto-avanza cada 4 segundos
            }

            function stopCategorySlideShow() {
                clearInterval(categoriesSlideInterval);
            }

            // Iniciar carrusel automático para categorías
            startCategorySlideShow();

            // Redirección al hacer clic en las tarjetas de categoría
            categoriesCarouselTrack.querySelectorAll('.category-card-draggable').forEach(card => {
                card.addEventListener('click', (event) => {
                    // Solo si no hubo un arrastre significativo
                    if (draggedCategories) { // Usar la bandera renombrada
                        event.preventDefault(); // Evitar la acción de clic si se arrastró
                        draggedCategories = false; // Resetear la bandera
                        return;
                    }

                    const categoryName = card.dataset.categoryName; // Obtener el nombre de la categoría del data-attribute
                    if (categoryName) {
                        // Redirigir a una página de productos filtrada por categoría
                        window.location.href = `productos.html?category=${categoryName}`;
                    }
                });

                // Estos listeners son para la detección de arrastre vs. clic en las tarjetas individuales
                card.addEventListener('mousedown', (e) => {
                    startXCategories = e.clientX;
                    draggedCategories = false;
                });
                card.addEventListener('mousemove', (e) => {
                    if (Math.abs(e.clientX - startXCategories) > 5) {
                        draggedCategories = true;
                    }
                });
            });            


            // 5. Manejo del formulario de Novedades (sección CTA inferior)
            const ctaForm = document.querySelector('.cta-form');
            if (ctaForm) {
                ctaForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Evita que el formulario se envíe
                    const emailInput = ctaForm.querySelector('input[type="email"]');
                    alert(`¡GRACIAS por unirte a la comunidad Vístete con el correo: ${emailInput.value}! Prepárate para recibir noticias de vanguardia.`);
                    emailInput.value = ''; // Limpiar el campo
                });
            }

            // 6. Funcionalidad de iconos de acción (simulada)
            productsCarouselTrack.addEventListener('click', (event) => {
                const targetBtn = event.target.closest('.action-icon-btn');
                if (!targetBtn) return; // No es un botón de acción

                const productCard = targetBtn.closest('.product-card-carousel');
                if (!productCard) {
                    console.error('Clicked button is not inside a product card.');
                    return;
                }
                
                const productId = productCard.dataset.productId;
                console.log('Clicked Product ID:', productId); // Debug log
                
                const product = productsData.find(p => p.id === productId);
                console.log('Found Product Data:', product); // Debug log

                if (!product) { // This check should now prevent calling showProductDetailsModal with undefined product.
                    console.error('Product data not found for ID:', productId);
                    return;
                }

                if (targetBtn.classList.contains('favorite-btn')) {
                    alert(`"${product.name}" ha sido añadido a tus favoritos. (Simulado)`);
                } else if (targetBtn.classList.contains('cart-btn')) {
                    alert(`"${product.name}" ha sido añadido al carrito. (Simulado)`);
                } else if (targetBtn.classList.contains('view-details-btn')) {
                    // Mostrar modal de detalles del producto
                    showProductDetailsModal(product);
                }
            });

            // 8. Lógica del Pop-up Modal de Suscripción
            const newsletterModal = document.getElementById('newsletterModal');
            const newsletterCloseBtn = newsletterModal.querySelector('.modal-close-btn');
            const newsletterForm = newsletterModal.querySelector('.modal-newsletter-form');
            const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
            const hasSeenNewsletterModal = localStorage.getItem('hasSeenNewsletterModal');

            if (!hasSeenNewsletterModal) {
                setTimeout(() => {
                    newsletterModal.style.display = 'flex';
                    setTimeout(() => {
                        newsletterModal.classList.add('active');
                    }, 50);
                }, 2000);
            }

            newsletterCloseBtn.addEventListener('click', () => {
                newsletterModal.classList.remove('active');
                setTimeout(() => {
                    newsletterModal.style.display = 'none';
                }, 300);
                if (dontShowAgainCheckbox.checked) {
                    localStorage.setItem('hasSeenNewsletterModal', 'true');
                }
            });

            newsletterModal.addEventListener('click', (event) => {
                if (event.target === newsletterModal) {
                    newsletterModal.classList.remove('active');
                    setTimeout(() => {
                        newsletterModal.style.display = 'none';
                    }, 300);
                    if (dontShowAgainCheckbox.checked) {
                        localStorage.setItem('hasSeenNewsletterModal', 'true');
                    }
                }
            });


            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const emailInput = newsletterForm.querySelector('input[type="email"]');
                    alert(`¡Bienvenido/a a la élite de Vístete con: ${emailInput.value}! Gracias por tu registro.`);
                    emailInput.value = '';
                    
                    newsletterModal.classList.remove('active');
                    setTimeout(() => {
                        newsletterModal.style.display = 'none';
                    }, 300);

                    if (dontShowAgainCheckbox.checked) {
                        localStorage.setItem('hasSeenNewsletterModal', 'true');
                    }
                });
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
                
                alert(`"${productName}" x ${quantity}${sizeInfo} ha sido añadido al carrito. (Simulado)`);
                
                // Cerrar el modal después de añadir al carrito
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            // 10. Lógica de la Sección "Próximos Diseños" (Coming Soon)
            const comingSoonCards = document.querySelectorAll('.coming-soon-card');

            const productsComingSoon = [
                {
                    name: 'Modelo Elegancia Clásica',
                    image: 'img/imagenes hd/0722e5c6e391c0f207c2af9a13f828c7_high.webp',
                    themeColor: '#2b5a74'
                },
                {
                    name: 'Modelo Elegancia Clásica (Variante)',
                    image: 'img/imagenes hd/0d08763b2de8a4ad8394c1ed616d8641_high.webp',
                    themeColor: '#2b5a74'
                },
                {
                    name: 'Estilo Urbano Avant-Garde',
                    image: 'img/imagenes hd/0f55993551bffd8339bf8a83ac8bdc7a_high.webp',
                    themeColor: '#6d5550'
                },
                {
                    name: 'Estilo Urbano Avant-Garde (Variante)',
                    image: 'img/imagenes hd/15d9ee2e6b69a32133332add2029fbf9_high.webp',
                    themeColor: '#6d5550'
                }
            ];

            // Ajusta los índices en el HTML:
            // 1ª tarjeta: data-original-product="0" data-hover-product="1"
            // 2ª tarjeta: data-original-product="2" data-hover-product="3"

            // Inicializa contenido y color de fondo
            comingSoonCards.forEach(card => {
                const imgElement = card.querySelector('.coming-soon-image-display');
                const nameElement = card.querySelector('.coming-soon-product-name');
                const originalProductIndex = parseInt(card.dataset.originalProduct);

                const initialProduct = productsComingSoon[originalProductIndex]; // Get the initial product data
                imgElement.src = initialProduct.image;
                nameElement.textContent = initialProduct.name;
                card.style.backgroundColor = initialProduct.themeColor; // Set initial background color
            });


            function animateComingSoonCard(cardElement, targetProductIndex) {
                const imgElement = cardElement.querySelector('.coming-soon-image-display');
                const nameElement = cardElement.querySelector('.coming-soon-product-name');
                const targetProduct = productsComingSoon[targetProductIndex];
                
                // Set target background color when transitioning in (for smooth color change)
                cardElement.style.backgroundColor = targetProduct.themeColor;

                // Phase 1: Wipe In (Shrink from outside to cover)
                cardElement.classList.add('transition-in'); 
                
                setTimeout(() => {
                    // Phase 2: Swap content when overlay is mostly covering
                    imgElement.src = targetProduct.image;
                    nameElement.textContent = targetProduct.name;

                    // Phase 3: Wipe Out (Expand from center to reveal)
                    cardElement.classList.remove('transition-in');
                    cardElement.classList.add('transition-out'); 

                    setTimeout(() => {
                        cardElement.classList.remove('transition-out'); 
                    }, 500); // Same duration as CSS transition
                }, 500); // Duration of the 'transition-in' CSS transition
            }

            comingSoonCards.forEach(card => {
                const originalProductIndex = parseInt(card.dataset.originalProduct);
                const hoverProductIndex = parseInt(card.dataset.hoverProduct); 

                card.addEventListener('mouseenter', () => {
                    animateComingSoonCard(card, hoverProductIndex);
                });

                card.addEventListener('mouseleave', () => {
                    animateComingSoonCard(card, originalProductIndex); // Return to original product
                });
            });
        });