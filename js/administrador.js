
        document.addEventListener('DOMContentLoaded', () => {
            const sidebarPageItems = document.querySelectorAll('.admin-sidebar-nav .page-item');
            const adminCardSections = document.querySelectorAll('.admin-card-section');
            const dynamicSectionTabsContainer = document.getElementById('dynamic-section-tabs');
            const sectionSelectorDropdown = document.getElementById('sectionSelector');
            const contentNavLink = document.getElementById('content-nav-link'); // Nuevo
            let currentPage = 'index.html'; // Página inicial por defecto
            let currentIframe = null; // Para mantener una referencia al iframe activo

            // Mapeo de páginas a sus secciones editables
            const pageSectionsMap = {
                'index.html': ['banner-section', 'about-section', 'featured-products-section', 'categories-section', 'coming-soon-section', 'newsletter-cta-section', 'footer-section'],
                'carrito.html': ['cart-content-section'],
                'contactenos.html': ['contact-form-section'],
                'hombres.html': ['hombres-banner-section', 'hombres-products-section'],
                'mujeres.html': ['product-list-mujeres'],
                'ninos.html': ['product-list-ninos'],
                'nosotros.html': ['about-us-page-section'],
                'general-settings-page': ['general-settings'] // Sección de ajustes generales
            };

            // Datos de productos de hombres (para clonar y pre-llenar nuevas tarjetas)
            const menProductsData = [
                {
                    id: 'men001',
                    name: 'Botas de Montaña Trekker',
                    price: 185.00,
                    image: 'https://placehold.co/300x300/a52a2a/ffffff?text=Botas+Trekker',
                    color: 'brown',
                    type: 'botas',
                    sizes: '40,41,42,43', // Convertido a string para el textarea
                    occasion: 'aventura',
                    upper_material: 'cuero',
                    sole_material: 'goma'
                },
                {
                    id: 'men002',
                    name: 'Zapatillas Urbanas "Street"',
                    price: 95.00,
                    image: 'https://placehold.co/300x300/1a202c/ffffff?text=Zapatillas+Street',
                    color: 'black',
                    type: 'zapatillas',
                    sizes: '41,42,43,44',
                    occasion: 'casual',
                    upper_material: 'textil',
                    sole_material: 'eva'
                },
                {
                    id: 'men003',
                    name: 'Zapatos Oxford Clásico',
                    price: 150.00,
                    image: 'https://placehold.co/300x300/4a5568/ffffff?text=Oxford+Clasico',
                    color: 'gray',
                    type: 'formal',
                    sizes: '39,40,41,42',
                    occasion: 'formal',
                    upper_material: 'cuero',
                    sole_material: 'poliuretano'
                },
                {
                    id: 'men004',
                    name: 'Zapatillas Deportivas "Boost"',
                    price: 120.00,
                    image: 'https://placehold.co/300x300/00f/ffffff?text=Zapatillas+Boost',
                    color: 'blue',
                    type: 'zapatillas',
                    sizes: '42,43,44,45',
                    occasion: 'deportivo',
                    upper_material: 'sintetico',
                    sole_material: 'goma'
                },
                {
                    id: 'men005',
                    name: 'Mocasines Confort',
                    price: 80.00,
                    image: 'https://placehold.co/300x300/ffffff/2d3748?text=Mocasines+Blanco',
                    color: 'white',
                    type: 'casual',
                    sizes: '39,40,41',
                    occasion: 'casual',
                    upper_material: 'cuero',
                    sole_material: 'goma'
                },
                {
                    id: 'men006',
                    name: 'Botines Chelsea Elegantes',
                    price: 190.00,
                    image: 'https://placehold.co/300x300/2d3748/ffffff?text=Botines+Chelsea',
                    color: 'black',
                    type: 'botas',
                    sizes: '40,41,42',
                    occasion: 'formal',
                    upper_material: 'cuero',
                    sole_material: 'goma'
                },
                {
                    id: 'men007',
                    name: 'Zapatillas de Lona Eco',
                    price: 65.00,
                    image: 'https://placehold.co/300x300/008000/ffffff?text=Zapatillas+Eco',
                    color: 'green',
                    type: 'casual',
                    sizes: '41,42,43',
                    occasion: 'casual',
                    upper_material: 'textil',
                    sole_material: 'goma'
                },
                {
                    id: 'men008',
                    name: 'Zapatos Brogue Detallado',
                    price: 160.00,
                    image: 'https://placehold.co/300x300/a0aec0/2d3748?text=Brogue+Detallado',
                    color: 'gray',
                    type: 'formal',
                    sizes: '40,41,42,43',
                    occasion: 'formal',
                    upper_material: 'cuero',
                    sole_material: 'poliuretano'
                }
            ];

            // Función para actualizar un elemento en el iframe de previsualización activo
            function updatePreview(selector, property, value) {
                if (!currentIframe) {
                    console.warn('No active iframe for preview.');
                    return;
                }
                const previewDoc = currentIframe.contentDocument || currentIframe.contentWindow.document;

                if (!previewDoc) {
                    console.warn('Preview document not ready in active iframe.');
                    return;
                }

                if (selector === 'document.title') {
                    previewDoc.title = value;
                    return;
                }

                const elements = previewDoc.querySelectorAll(selector);
                elements.forEach(element => {
                    if (property === 'textContent') {
                        element.textContent = value;
                    } else if (property === 'src') {
                        element.src = value;
                    } else if (property === 'backgroundImage') {
                        element.style.backgroundImage = `url('${value}')`;
                    } else if (property === 'backgroundColor') {
                        element.style.backgroundColor = value;
                    }
                    // Agrega más propiedades CSS o atributos HTML según sea necesario
                });
            }

            // Función para activar una sección
            function activateSection(sectionId) {
                // Desactivar todas las pestañas (botones)
                document.querySelectorAll('.dynamic-tabs-container .tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Ocultar todas las secciones de tarjetas y resetear sus iframes
                adminCardSections.forEach(section => {
                    section.classList.remove('active-tab-content');
                    const iframe = section.querySelector('.section-preview-iframe');
                    if (iframe) {
                        iframe.src = 'about:blank'; // Limpiar el iframe cuando la sección no está activa
                    }
                });

                // Activar la pestaña/opción clicada
                const clickedTabButton = document.querySelector(`.dynamic-tabs-container .tab-button[data-tab="${sectionId}"]`);
                if (clickedTabButton) {
                    clickedTabButton.classList.add('active');
                }

                // Mostrar la sección correspondiente
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active-tab-content');
                    // Establecer el iframe activo para la previsualización
                    currentIframe = targetSection.querySelector('.section-preview-iframe');
                    if (currentIframe) {
                        // Cargar la URL de la página en el iframe de la sección activa
                        const pageUrl = document.querySelector(`.admin-sidebar-nav .page-item.active`).dataset.pageUrl;
                        if (pageUrl && pageUrl !== 'general-settings') {
                            currentIframe.src = `https://rodrigomo123.github.io/VisteteROMO/${pageUrl}`;
                        } else {
                            currentIframe.src = 'https://rodrigomo123.github.io/VisteteROMO'; // Si es ajustes generales, no hay preview de página
                        }
                        // Asegurarse de que el iframe esté cargado antes de intentar actualizarlo
                        currentIframe.onload = () => {
                            initializeEditableFieldsInPreview(currentIframe.contentDocument || currentIframe.contentWindow.document);
                        };
                    }
                }
            }

            // Función para actualizar el panel de administración según la página seleccionada
            function updateAdminPanelForPage(selectedPage) {
                // Limpiar pestañas dinámicas y opciones de dropdown existentes
                dynamicSectionTabsContainer.innerHTML = '';
                sectionSelectorDropdown.innerHTML = '';

                // Ocultar todas las secciones de tarjetas
                adminCardSections.forEach(section => section.classList.remove('active-tab-content'));

                const sectionsToShow = pageSectionsMap[selectedPage];
                let firstSectionId = null;

                if (sectionsToShow) {
                    sectionsToShow.forEach(sectionId => {
                        const sectionElement = document.getElementById(sectionId);
                        if (sectionElement) {
                            const sectionTitle = sectionElement.dataset.sectionName || sectionElement.querySelector('h3').textContent;

                            // Crear botón de pestaña para pantallas grandes
                            const tabButton = document.createElement('button');
                            tabButton.classList.add('tab-button');
                            tabButton.dataset.tab = sectionId;
                            tabButton.textContent = sectionTitle;
                            dynamicSectionTabsContainer.appendChild(tabButton);

                            tabButton.addEventListener('click', () => {
                                activateSection(sectionId);
                            });

                            // Crear opción para el dropdown de pantallas pequeñas
                            const option = document.createElement('option');
                            option.value = sectionId;
                            option.textContent = sectionTitle;
                            sectionSelectorDropdown.appendChild(option);

                            if (!firstSectionId) {
                                firstSectionId = sectionId;
                            }
                        }
                    });
                }

                // Activar la primera sección por defecto
                if (firstSectionId) {
                    activateSection(firstSectionId);
                } else {
                    console.log('No hay secciones configurables para esta página.');
                }
            }

            // Manejador de cambio para los elementos de página en la barra lateral
            sidebarPageItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault(); // Evita el salto de ancla por defecto
                    const newPage = item.dataset.page;
                    const pageUrl = item.dataset.pageUrl;

                    // Desactivar el elemento de menú activo actual
                    sidebarPageItems.forEach(li => li.classList.remove('active'));
                    // Activar el elemento de menú clicado
                    item.classList.add('active');

                    // Actualizar la página actual y el panel de administración
                    currentPage = newPage;
                    updateAdminPanelForPage(currentPage);
                });
            });

            // Listener para el dropdown de selección de sección en pantallas pequeñas
            sectionSelectorDropdown.addEventListener('change', (e) => {
                activateSection(e.target.value);
            });

            // Listener para la nueva opción "Contenido" en la barra principal
            contentNavLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Desactivar todos los elementos de navegación superior
                document.querySelectorAll('.admin-nav ul li').forEach(li => li.classList.remove('active'));
                // Activar la opción de Contenido
                contentNavLink.closest('li').classList.add('active');

                // Simular clic en el elemento de la barra lateral de "Página Principal"
                // para mostrar las secciones de contenido de la página principal.
                const homePageItem = document.querySelector('.admin-sidebar-nav .page-item[data-page="index.html"]');
                if (homePageItem) {
                    homePageItem.click();
                }
            });

            // Lógica para alternar entre Subir Imagen y Pegar URL
            function initializeImageUploadToggles(container) {
                const toggleUploadBtn = container.querySelector('.btn-toggle-upload');
                const toggleUrlBtn = container.querySelector('.btn-toggle-url');
                
                if (toggleUploadBtn && toggleUrlBtn) {
                    const uploadArea = document.getElementById(toggleUploadBtn.dataset.toggleTarget);
                    const urlArea = document.getElementById(toggleUrlBtn.dataset.toggleTarget);

                    // Mostrar por defecto el área de URL si ya tiene un valor
                    const urlInput = urlArea.querySelector('.image-url-input');
                    if (urlInput && urlInput.value && urlInput.value !== 'https://placehold.co/600x400/cccccc/333333?text=Nueva+Imagen' && urlInput.value !== 'https://placehold.co/350x350/cccccc/333333?text=Nuevo+Producto' && urlInput.value !== 'https://placehold.co/400x300/cccccc/333333?text=Nueva+Categoría' && urlInput.value !== 'https://placehold.co/600x450/cccccc/333333?text=Nuevo+Diseño' && urlInput.value !== 'https://placehold.co/600x400/cccccc/333333?text=Nosotros+Page' && urlInput.value !== 'https://placehold.co/350x350/cccccc/333333?text=Hombre+Prod+1' && urlInput.value !== 'https://placehold.co/350x350/cccccc/333333?text=Mujer+Prod+1' && urlInput.value !== 'https://placehold.co/350x350/cccccc/333333?text=Niños+Prod+1' && urlInput.value !== 'https://placehold.co/1920x900/1A202C/ffffff?text=Moda+Masculina') { // Evitar activar si es un placeholder
                        urlArea.classList.remove('hidden');
                        toggleUrlBtn.classList.add('active');
                        uploadArea.classList.add('hidden');
                        toggleUploadBtn.classList.remove('active');
                    } else {
                        uploadArea.classList.remove('hidden');
                        toggleUploadBtn.classList.add('active');
                        urlArea.classList.add('hidden');
                        toggleUrlBtn.classList.remove('active');
                    }

                    toggleUploadBtn.onclick = () => {
                        uploadArea.classList.remove('hidden');
                        urlArea.classList.add('hidden');
                        toggleUploadBtn.classList.add('active');
                        toggleUrlBtn.classList.remove('active');
                    };

                    toggleUrlBtn.onclick = () => {
                        urlArea.classList.remove('hidden');
                        uploadArea.classList.add('hidden');
                        toggleUrlBtn.classList.add('active');
                        toggleUploadBtn.classList.remove('active');
                    };
                }
            }

            // Lógica de Previsualización en Tiempo Real
            function initializeEditableFields(card) {
                card.querySelectorAll('.editable-field').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const selector = input.dataset.targetSelector;
                        const property = input.dataset.property;
                        let value = e.target.value;

                        // Para campos de color, aplicar directamente el valor
                        if (input.type === 'color' && property === 'backgroundColor') {
                            updatePreview(selector, property, value);
                        } else if (selector) { // Solo si hay un selector para el iframe
                            updatePreview(selector, property, value);
                        }
                    });
                });

                // Manejo de inputs de imagen (URL y File) para previsualización
                card.querySelectorAll('.image-url-input').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const previewImage = card.querySelector(input.dataset.previewTarget);
                        const selector = input.dataset.targetSelector;
                        const property = input.dataset.property;
                        const value = e.target.value;

                        if (previewImage) {
                            previewImage.src = value; // Actualiza la imagen en el panel de admin
                        }
                        if (selector) { // Solo si hay un selector para el iframe
                            updatePreview(selector, property, value); // Actualiza la imagen en el iframe
                        }
                    });
                });

                card.querySelectorAll('.image-upload-input').forEach(input => {
                    input.addEventListener('change', (e) => {
                        const previewImage = card.querySelector(input.dataset.previewTarget);
                        const selector = input.dataset.targetSelector;
                        const property = input.dataset.property;

                        if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (readerEvent) => {
                                if (previewImage) {
                                    previewImage.src = readerEvent.target.result;
                                }
                                if (selector) { // Solo si hay un selector para el iframe
                                    updatePreview(selector, property, readerEvent.target.result);
                                }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    });
                });
            }

            // Función para inicializar los campos editables dentro del iframe (si es necesario)
            function initializeEditableFieldsInPreview(previewDoc) {
                // Esta función se llamaría cuando el contenido del iframe se carga.
                // Aquí podrías añadir lógica para detectar elementos editables en el iframe
                // y adjuntar listeners si el iframe mismo es editable.
                // Por ahora, la edición se maneja desde el panel de administración
                // y se propaga al iframe a través de updatePreview.
            }

            // Funcionalidad de "Guardar Cambios" (simulada)
            function initializeSaveButton(card) {
                card.querySelector('.btn-save').addEventListener('click', () => {
                    alert('¡Cambios guardados simuladamente! En un sistema real, esto enviaría los datos al servidor.');
                });
            }

            // Funcionalidad de "Eliminar" (simulada)
            function initializeDeleteButton(card) {
                const deleteButton = card.querySelector('.btn-delete');
                if (deleteButton) {
                    deleteButton.addEventListener('click', () => {
                        if (confirm('¿Estás seguro de que quieres eliminar este elemento? (Simulado)')) {
                            card.remove();
                            alert('Elemento eliminado simuladamente.');
                        }
                    });
                }
            }

            // Funcionalidad de "Añadir Nuevo" (simulada)
            document.querySelectorAll('.btn-add-new').forEach(button => {
                button.addEventListener('click', (e) => {
                    const sectionType = e.target.dataset.sectionType;
                    const parentGrid = e.target.closest('.admin-card-grid');
                    let newCardHtml = '';
                    let newId = Date.now(); // ID único para el nuevo elemento

                    // Clonar una tarjeta existente para mantener la estructura y actualizar IDs/valores
                    let templateCard;
                    if (sectionType === 'banner-slide') {
                        templateCard = document.querySelector('.admin-card[data-slide-index="0"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-slide-index="0"/g, `data-slide-index="${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="bannerTitle0"/g, `id="bannerTitle${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="bannerSubtitle0"/g, `id="bannerSubtitle${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="banner-upload-0"/g, `id="banner-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="banner-url-0"/g, `id="banner-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="DESCUBRE LA POTENCIA EN CADA PISADA"/g, 'value="Nuevo Título del Slide"');
                        newCardHtml = newCardHtml.replace(/Donde la ingeniería y el diseño se fusionan para desafiar tus límites./g, 'Nuevo Subtítulo del Slide');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato1.jpg"/g, 'value="https://placehold.co/600x400/cccccc/333333?text=Nueva+Imagen"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato1.jpg"/g, 'src="https://placehold.co/600x400/cccccc/333333?text=Nueva+Imagen"');
                        newCardHtml = newCardHtml.replace(/<h4>Slide 1<\/h4>/g, `<h4>Nuevo Slide ${newId}</h4>`);

                    } else if (sectionType === 'product') {
                        templateCard = document.querySelector('.admin-card[data-product-id="prod001"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-product-id="prod001"/g, `data-product-id="prod${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="productName001"/g, `id="productName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="productDesc001"/g, `id="productDesc${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="productPrice001"/g, `id="productPrice${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="product-upload-001"/g, `id="product-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="product-url-001"/g, `id="product-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="Bota Táctica 'Apex'"/g, 'value="Nuevo Producto"');
                        newCardHtml = newCardHtml.replace(/Diseñadas para terrenos extremos, máxima tracción y resistencia a la abrasión./g, 'Descripción del nuevo producto.');
                        newCardHtml = newCardHtml.replace(/value="\$249.99"/g, 'value="$0.00"');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato7.jpg"/g, 'value="https://placehold.co/350x350/cccccc/333333?text=Nuevo+Producto"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato7.jpg"/g, 'src="https://placehold.co/350x350/cccccc/333333?text=Nuevo+Producto"');
                        newCardHtml = newCardHtml.replace(/<h4>Bota Táctica "Apex"<\/h4>/g, `<h4>Nuevo Producto ${newId}</h4>`);

                    } else if (sectionType === 'category') {
                        templateCard = document.querySelector('.admin-card[data-category-id="1"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-category-id="1"/g, `data-category-id="${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="categoryName1"/g, `id="categoryName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="category-upload-1"/g, `id="category-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="category-url-1"/g, `id="category-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="FASHION"/g, 'value="Nueva Categoría"');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato13.jpg"/g, 'value="https://placehold.co/400x300/cccccc/333333?text=Nueva+Categoría"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato13.jpg"/g, 'src="https://placehold.co/400x300/cccccc/333333?text=Nueva+Categoría"');
                        newCardHtml = newCardHtml.replace(/<h4>FASHION<\/h4>/g, `<h4>Nueva Categoría ${newId}</h4>`);

                    } else if (sectionType === 'coming-soon') {
                        templateCard = document.querySelector('.admin-card[data-cs-original-index="0"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-cs-original-index="0"/g, `data-cs-original-index="${newId}"`);
                        newCardHtml = newCardHtml.replace(/data-cs-hover-index="1"/g, `data-cs-hover-index="${newId + 1}"`);
                        newCardHtml = newCardHtml.replace(/id="csName0"/g, `id="csName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="cs-upload-0"/g, `id="cs-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="cs-url-0"/g, `id="cs-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="csColor0"/g, `id="csColor${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="Modelo Elegancia Clásica"/g, 'value="Nuevo Diseño Próximamente"');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato16.jpg"/g, 'value="https://placehold.co/600x450/cccccc/333333?text=Nuevo+Diseño"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato16.jpg"/g, 'src="https://placehold.co/600x450/cccccc/333333?text=Nuevo+Diseño"');
                        newCardHtml = newCardHtml.replace(/value="#2b5a74"/g, 'value="#000000"');
                        newCardHtml = newCardHtml.replace(/<h4>Modelo Elegancia Clásica<\/h4>/g, `<h4>Nuevo Diseño ${newId}</h4>`);
                        newCardHtml = newCardHtml.replace(/<p class="coming-soon-product-name">Modelo Elegancia Clásica<\/p>/g, `<p class="coming-soon-product-name">Nuevo Diseño</p>`);
                    } else if (sectionType === 'hombres-product') {
                        // Clonar una tarjeta de producto de hombres existente para el nuevo producto
                        templateCard = document.querySelector('.admin-card[data-product-id="men001"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-product-id="men001"/g, `data-product-id="men${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdName001"/g, `id="menProdName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdPrice001"/g, `id="menProdPrice${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdColor001"/g, `id="menProdColor${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdType001"/g, `id="menProdType${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdSizes001"/g, `id="menProdSizes${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdOccasion001"/g, `id="menProdOccasion${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdUpperMaterial001"/g, `id="menProdUpperMaterial${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="menProdSoleMaterial001"/g, `id="menProdSoleMaterial${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="men-prod-upload-001"/g, `id="men-prod-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="men-prod-url-001"/g, `id="men-prod-url-${newId}"`);
                        // Actualizar valores por defecto para el nuevo producto
                        newCardHtml = newCardHtml.replace(/value="Botas de Montaña Trekker"/g, 'value="Nuevo Producto Hombre"');
                        newCardHtml = newCardHtml.replace(/value="\$185.00"/g, 'value="$0.00"');
                        newCardHtml = newCardHtml.replace(/value="brown"/g, 'value="black"');
                        newCardHtml = newCardHtml.replace(/value="botas"/g, 'value="zapatillas"');
                        newCardHtml = newCardHtml.replace(/40,41,42,43/g, '40,41,42');
                        newCardHtml = newCardHtml.replace(/value="aventura"/g, 'value="casual"');
                        newCardHtml = newCardHtml.replace(/value="cuero"/g, 'value="sintetico"');
                        newCardHtml = newCardHtml.replace(/value="goma"/g, 'value="eva"');
                        newCardHtml = newCardHtml.replace(/https:\/\/placehold.co\/300x300\/a52a2a\/ffffff\?text=Botas\+Trekker/g, 'https://placehold.co/300x300/cccccc/333333?text=Nuevo+Prod+Hombre');
                        newCardHtml = newCardHtml.replace(/<h4>Botas de Montaña Trekker<\/h4>/g, `<h4>Nuevo Producto Hombre ${newId}</h4>`);

                    } else if (sectionType === 'product-mujeres' || sectionType === 'product-ninos') {
                        templateCard = document.querySelector(`.admin-card[data-product-category="${sectionType.replace('product-', '')}-001"]`);
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(new RegExp(`data-product-category="${sectionType.replace('product-', '')}-001"`, 'g'), `data-product-category="${sectionType.replace('product-', '')}-${newId}"`);
                        newCardHtml = newCardHtml.replace(new RegExp(`id="${sectionType.replace('product-', '')}ProdName1"`, 'g'), `id="${sectionType.replace('product-', '')}ProdName${newId}"`);
                        newCardHtml = newCardHtml.replace(new RegExp(`id="${sectionType.replace('product-', '')}ProdDesc1"`, 'g'), `id="${sectionType.replace('product-', '')}ProdDesc${newId}"`);
                        newCardHtml = newCardHtml.replace(new RegExp(`id="${sectionType.replace('product-', '')}-upload-1"`, 'g'), `id="${sectionType.replace('product-', '')}-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(new RegExp(`id="${sectionType.replace('product-', '')}-url-1"`, 'g'), `id="${sectionType.replace('product-', '')}-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="Tacones 'Glamour'"/g, 'value="Nuevo Producto"'); // Generic value
                        newCardHtml = newCardHtml.replace(/Perfectos para cualquier ocasión especial./g, 'Descripción del nuevo producto.'); // Generic description
                        newCardHtml = newCardHtml.replace(/https:\/\/placehold.co\/350x350\/cccccc\/333333\?text=Mujer\+Prod\+1/g, `https://placehold.co/350x350/cccccc/333333?text=Nuevo+${sectionType.replace('product-', '')}+Prod`);
                        newCardHtml = newCardHtml.replace(/<h4>Tacones Elegantes Mujer<\/h4>/g, `<h4>Nuevo Producto ${newId}</h4>`);
                    }
                    
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newCardHtml;
                    const newCard = tempDiv.firstElementChild;

                    parentGrid.insertBefore(newCard, button.closest('.add-new-card')); // Insertar antes del botón "Añadir Nuevo"

                    // Re-inicializar listeners para los nuevos elementos
                    initializeCardListeners(newCard);

                    alert(`¡Nuevo ${sectionType} añadido simuladamente!`);
                });
            });

            // Función para inicializar listeners para una tarjeta (útil para nuevas tarjetas añadidas)
            function initializeCardListeners(card) {
                initializeEditableFields(card);
                initializeImageUploadToggles(card);
                initializeDeleteButton(card);
                initializeSaveButton(card);
            }

            // Inicializar listeners para todas las tarjetas existentes al cargar
            document.querySelectorAll('.editable-card').forEach(card => {
                initializeCardListeners(card);
            });

            // Inicializar el panel con la página principal por defecto y la primera sección activa
            const initialPageItem = document.querySelector('.admin-sidebar-nav .page-item[data-page="index.html"]');
            if (initialPageItem) {
                initialPageItem.click(); // Simula un clic para activar la página y sus secciones
            }
        });
