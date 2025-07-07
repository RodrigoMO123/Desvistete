
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Imágenes locales disponibles
            // NOTA IMPORTANTE: Estas rutas de imagen ('img/jpeg/', 'img/jpg/') son locales.
            // No se mostrarán en Canvas o en un navegador web sin que los archivos de imagen
            // estén presentes en las carpetas correspondientes en tu servidor o computadora.
            // Si deseas ver imágenes en Canvas, por favor, reemplaza estas rutas con URLs públicas.
            const jpegImages = [
                'img/jpeg/zapato1.jpeg',
                'img/jpeg/zapato2.jpeg'
            ];
            const jpgImages = [
                'img/jpg/zapato1.jpg', 'img/jpg/zapato10.jpg', 'img/jpg/zapato11.jpg', 'img/jpg/zapato12.jpg', 'img/jpg/zapato13.jpg',
                'img/jpg/zapato14.jpg', 'img/jpg/zapato15.jpg', 'img/jpg/zapato16.jpg', 'img/jpg/zapato17.jpg', 'img/jpg/zapato18.jpg',
                'img/jpg/zapato19.jpg', 'img/jpg/zapato2.jpg', 'img/jpg/zapato20.jpg', 'img/jpg/zapato21.jpg', 'img/jpg/zapato22.jpg',
                'img/jpg/zapato23.jpg', 'img/jpg/zapato24.jpg', 'img/jpg/zapato25.jpg', 'img/jpg/zapato26.jpg'
            ];
            const allImages = [...jpegImages, ...jpgImages]; // Usamos las mismas imágenes por simplicidad, idealmente serían imágenes de mujer

            // 2. Productos (puedes agregar más si lo deseas)
            const womenProductsData = [
                {
                    id: 'wom001',
                    name: 'Zapatillas Urbanas Chic',
                    price: 85.00,
                    color: 'white',
                    type: 'zapatillas',
                    sizes: ['39', '40', '41'],
                    occasion: 'casual',
                    upper_material: 'textil',
                    sole_material: 'eva'
                },
                {
                    id: 'wom002',
                    name: 'Botas de Cuero Elegantes',
                    price: 170.00,
                    color: 'black',
                    type: 'botas',
                    sizes: ['39', '40', '41', '42'],
                    occasion: 'formal',
                    upper_material: 'cuero',
                    sole_material: 'goma'
                },
                {
                    id: 'wom003',
                    name: 'Zapatos Casuales de Lona',
                    price: 60.00,
                    color: 'blue',
                    type: 'casual',
                    sizes: ['38', '39', '40'],
                    occasion: 'casual',
                    upper_material: 'textil',
                    sole_material: 'goma'
                },
                {
                    id: 'wom004',
                    name: 'Zapatillas Deportivas Ultra',
                    price: 110.00,
                    color: 'green',
                    type: 'zapatillas',
                    sizes: ['40', '41', '42', '43'],
                    occasion: 'deportivo',
                    upper_material: 'sintetico',
                    sole_material: 'poliuretano'
                },
                {
                    id: 'wom005',
                    name: 'Mocasines de Ante',
                    price: 95.00,
                    color: 'brown',
                    type: 'casual',
                    sizes: ['39', '40', '41'],
                    occasion: 'casual',
                    upper_material: 'cuero',
                    sole_material: 'goma'
                },
                {
                    id: 'wom006',
                    name: 'Botines de Tacón Medio',
                    price: 130.00,
                    color: 'gray',
                    type: 'botas',
                    sizes: ['38', '39', '40'],
                    occasion: 'formal',
                    upper_material: 'cuero',
                    sole_material: 'poliuretano'
                },
                {
                    id: 'wom007',
                    name: 'Zapatillas de Senderismo',
                    price: 140.00,
                    color: 'blue',
                    type: 'zapatillas',
                    sizes: ['41', '42', '43', '44'],
                    occasion: 'aventura',
                    upper_material: 'sintetico',
                    sole_material: 'goma'
                },
                {
                    id: 'wom008',
                    name: 'Zapatos Oxford Femeninos',
                    price: 120.00,
                    color: 'black',
                    type: 'formal',
                    sizes: ['37', '38', '39'],
                    occasion: 'formal',
                    upper_material: 'cuero',
                    sole_material: 'poliuretano'
                }
            ];

            // Asignar imagen aleatoria a cada producto
            womenProductsData.forEach(p => {
                p.image = allImages[Math.floor(Math.random() * allImages.length)];
            });

            // Modal y utilidades (igual que antes)
            function showCustomMessageBox(message) {
                const messageBox = document.getElementById('customMessageBox');
                const messageBoxText = document.getElementById('messageBoxText');
                const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');
                messageBoxText.textContent = message;
                messageBox.classList.add('show');
                const closeMessageBox = () => {
                    messageBox.classList.remove('show');
                    messageBoxCloseBtn.removeEventListener('click', closeMessageBox);
                    messageBox.removeEventListener('click', handleOverlayClick);
                };
                const handleOverlayClick = (event) => {
                    if (event.target === messageBox) {
                        closeMessageBox();
                    }
                };
                messageBoxCloseBtn.addEventListener('click', closeMessageBox);
                messageBox.addEventListener('click', handleOverlayClick);
            }

            // Modal de detalles
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
            let selectedSize = '';

            function showProductDetailsModal(product) {
                modalProductImage.src = product.image;
                modalProductName.textContent = product.name;
                modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
                modalProductAvailability.textContent = "En Stock";
                modalProductCode.textContent = product.id;
                modalProductType.textContent = product.type;
                modalProductVendor.textContent = "Vístete";
                modalProductSizes.innerHTML = '';
                product.sizes.forEach(size => {
                    const sizeOption = document.createElement('span');
                    sizeOption.classList.add('size-option');
                    sizeOption.textContent = size;
                    sizeOption.addEventListener('click', () => {
                        modalProductSizes.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                        sizeOption.classList.add('selected');
                        selectedSize = size;
                    });
                    modalProductSizes.appendChild(sizeOption);
                });
                productQuantityInput.value = 1;
                selectedSize = '';
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
            addToCartFullBtn.addEventListener('click', () => {
                const productName = modalProductName.textContent;
                const quantity = productQuantityInput.value;
                const sizeInfo = selectedSize ? ` (Talla: ${selectedSize})` : '';
                showCustomMessageBox(`"${productName}" x ${quantity}${sizeInfo} ha sido añadido al carrito. (Simulado)`);
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            // 3. Renderizado y filtros
            const womenProductsGrid = document.getElementById('womenProductsGrid');
            const filterButtons = document.querySelectorAll('.filter-option-btn');
            const colorOptions = document.querySelectorAll('.color-option');
            const applyFiltersBtn = document.getElementById('applyFiltersBtn');
            const clearFiltersBtn = document.getElementById('clearFiltersBtn');
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            let activeFilters = {
                color: null,
                type: null,
                size: null,
                occasion: null,
                'upper-material': null,
                'sole-material': null
            };

            function createWomenProductCard(product) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.productId = product.id;
                productCard.innerHTML = `
                    <div class="product-card-img-container">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-card-info">
                        <h4>${product.name}</h4>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-primary">Ver Detalles</button>
                    </div>
                `;
                productCard.querySelector('.btn-primary').addEventListener('click', (event) => {
                    event.stopPropagation(); // Evita que el clic en el botón active el modal del padre
                    showProductDetailsModal(product);
                });
                // Añadir evento al card completo para abrir el modal también
                productCard.addEventListener('click', () => showProductDetailsModal(product));
                return productCard;
            }

            function renderWomenProducts(productsToRender) {
                womenProductsGrid.innerHTML = '';
                if (productsToRender.length === 0) {
                    womenProductsGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; font-size: 1.2rem; color: var(--subtle-blue);">No se encontraron productos con los filtros seleccionados.</p>';
                    return;
                }
                productsToRender.forEach(product => {
                    womenProductsGrid.appendChild(createWomenProductCard(product));
                });
                // Una vez renderizados, aplicar la animación de aparición
                const renderedProductCards = womenProductsGrid.querySelectorAll('.product-card');
                renderedProductCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * index); // Pequeño retraso para cada tarjeta
                });
            }

            function filterWomenProducts() {
                let filteredProducts = womenProductsData.filter(product => {
                    if (activeFilters.color && product.color !== activeFilters.color) return false;
                    if (activeFilters.type && product.type !== activeFilters.type) return false;
                    if (activeFilters.size && !product.sizes.includes(activeFilters.size)) return false;
                    if (activeFilters.occasion && product.occasion !== activeFilters.occasion) return false;
                    if (activeFilters['upper-material'] && product.upper_material !== activeFilters['upper-material']) return false;
                    if (activeFilters['sole-material'] && product.sole_material !== activeFilters['sole-material']) return false;
                    return true;
                });
                renderWomenProducts(filteredProducts);
            }

            // Filtros funcionales para todos los grupos
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterType = button.dataset.filter;
                    const filterValue = button.dataset.value;
                    // Deseleccionar los demás botones del mismo grupo
                    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    activeFilters[filterType] = filterValue;
                });
            });
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const filterType = option.dataset.filter;
                    const filterValue = option.dataset.value;
                    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    activeFilters[filterType] = filterValue;
                });
            });

            applyFiltersBtn.addEventListener('click', filterWomenProducts);
            clearFiltersBtn.addEventListener('click', () => {
                for (const key in activeFilters) activeFilters[key] = null;
                filterButtons.forEach(button => button.classList.remove('selected'));
                colorOptions.forEach(option => option.classList.remove('selected'));
                renderWomenProducts(womenProductsData);
            });

            // Render inicial
            renderWomenProducts(womenProductsData);

            // Funcionalidad para el menú hamburguesa (toggle)
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Funcionalidad para colapsar/expandir filtros
            document.querySelectorAll('.filter-group h4').forEach(header => {
                header.addEventListener('click', () => {
                    const filterGroup = header.closest('.filter-group');
                    filterGroup.classList.toggle('collapsed');
                });
            });

            // Animación de la barra de navegación al hacer scroll (sticky header)
            const header = document.querySelector('.main-header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        });
