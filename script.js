// ==========================================
// TIAM WOOD ART - MAIN SCRIPT
// ==========================================


// ==========================================
// محصولات پیش‌فرض
// ==========================================

const defaultProducts = [

    {
        name: "ساعت چوبی دست‌ساز",
        description: "ساخته شده از چوب طبیعی گردو",
        price: 850000,
        image: "images/saat.jpg",
        images: [
            "images/saat.jpg"
        ],
        category: "دکور چوبی"
    },

    {
        name: "استند چوبی",
        description: "ساده، زیبا و کاربردی",
        price: 320000,
        image: "images/stand.jpg",
        images: [
            "images/stand.jpg"
        ],
        category: "لوازم کاربردی"
    },

    {
        name: "باکس چوبی",
        description: "مناسب برای هدیه",
        price: 650000,
        image: "images/box.jpg",
        images: [
            "images/box.jpg"
        ],
        category: "هدیه"
    }

];


// ==========================================
// دریافت محصولات از LocalStorage
// ==========================================

let products = [];

try {

    products =
        JSON.parse(
            localStorage.getItem("tiamProducts")
        ) || defaultProducts;

} catch (error) {

    console.error(
        "خطا در دریافت محصولات:",
        error
    );

    products = defaultProducts;

}


// اگر LocalStorage خالی بود
if (!localStorage.getItem("tiamProducts")) {

    localStorage.setItem(
        "tiamProducts",
        JSON.stringify(products)
    );

}


// ==========================================
// سبد خرید
// ==========================================

let cart = [];

try {

    cart =
        JSON.parse(
            localStorage.getItem("tiamCart")
        ) || [];

} catch (error) {

    cart = [];

}


// ==========================================
// دسته‌بندی
// ==========================================

let selectedCategory = "all";


// ==========================================
// Sort
// ==========================================

let selectedSort = "newest";


// ==========================================
// علاقه‌مندی‌ها
// ==========================================

let favorites = [];

try {

    favorites =
        JSON.parse(
            localStorage.getItem("tiamFavorites")
        ) || [];

} catch (error) {

    favorites = [];

}


// ==========================================
// فرمت قیمت
// ==========================================

function formatPrice(price) {

    return Number(
        price || 0
    ).toLocaleString("fa-IR");

}


// ==========================================
// گرفتن المنت‌ها
// ==========================================

const productList =
    document.getElementById(
        "productList"
    );


// ==========================================
// نمایش محصولات
// ==========================================

function renderProducts() {

    // اگر صفحه product.html یا admin.html است
    // کاری انجام نده

    if (!productList) {
        return;
    }


    productList.innerHTML = "";


    // ------------------------------------------
    // جستجو
    // ------------------------------------------

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    // ------------------------------------------
    // فیلتر محصولات
    // ------------------------------------------

    let filteredProducts =
        products.filter(
            function(product) {

                const name =
                    String(
                        product.name || ""
                    ).toLowerCase();


                const description =
                    String(
                        product.description || ""
                    ).toLowerCase();


                const category =
                    String(
                        product.category || ""
                    );


                const matchesSearch =
                    name.includes(searchText) ||
                    description.includes(searchText);


                const matchesCategory =
                    selectedCategory === "all" ||
                    category === selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    // ------------------------------------------
    // Sort
    // ------------------------------------------

    filteredProducts.sort(
        function(a, b) {

            switch (selectedSort) {

                // جدیدترین
                case "newest":

                    return (
                        products.indexOf(b) -
                        products.indexOf(a)
                    );


                // قدیمی‌ترین
                case "oldest":

                    return (
                        products.indexOf(a) -
                        products.indexOf(b)
                    );


                // ارزان‌ترین
                case "price-low":

                    return (
                        Number(a.price || 0) -
                        Number(b.price || 0)
                    );


                // گران‌ترین
                case "price-high":

                    return (
                        Number(b.price || 0) -
                        Number(a.price || 0)
                    );


                // الفبا
                case "name":

                    return String(
                        a.name || ""
                    ).localeCompare(
                        String(
                            b.name || ""
                        ),
                        "fa"
                    );


                default:

                    return 0;

            }

        }
    );


    // ------------------------------------------
    // ساخت کارت‌ها
    // ------------------------------------------

    filteredProducts.forEach(
        function(product) {

            const index =
                products.indexOf(product);


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card";


            const isFavorite =
                favorites.includes(index);


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image || "images/no-image.jpg"}"
                        alt="${product.name || "محصول"}"
                        loading="lazy"
                    >


                    <span class="product-badge">

                        دست‌ساز

                    </span>


                    <button
                        type="button"
                        class="favorite-button ${isFavorite ? "active" : ""}"
                        aria-label="افزودن به علاقه‌مندی"
                    >

                        ${isFavorite ? "♥" : "♡"}

                    </button>


                    <div class="product-overlay">

                        <button
                            type="button"
                            class="quick-view-button"
                        >

                            👁 مشاهده سریع

                        </button>

                    </div>

                </div>


                <div class="product-info">

                    <span class="product-category">

                        ${product.category || "محصول چوبی"}

                    </span>


                    <h3>

                        ${product.name || "محصول"}

                    </h3>


                    <p>

                        ${product.description || ""}

                    </p>


                    <div class="product-rating">

                        <span>
                            ★★★★★
                        </span>

                        <small>
                            5.0
                        </small>

                    </div>


                    <div class="product-bottom">

                        <div class="product-price">

                            <strong>

                                ${formatPrice(product.price)}

                            </strong>

                            <small>
                                تومان
                            </small>

                        </div>


                        <button
                            type="button"
                            class="add-cart-button"
                        >

                            🛒 افزودن

                        </button>

                    </div>

                </div>

            `;


            // ------------------------------------------
            // علاقه‌مندی
            // ------------------------------------------

            const favoriteButton =
                card.querySelector(
                    ".favorite-button"
                );


            if (favoriteButton) {

                favoriteButton.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();

                        toggleFavorite(
                            index
                        );

                    }
                );

            }


            // ------------------------------------------
            // مشاهده سریع
            // ------------------------------------------

            const quickButton =
                card.querySelector(
                    ".quick-view-button"
                );


            if (quickButton) {

                quickButton.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();

                        quickView(
                            index
                        );

                    }
                );

            }


            // ------------------------------------------
            // افزودن به سبد
            // ------------------------------------------

            const cartButton =
                card.querySelector(
                    ".add-cart-button"
                );


            if (cartButton) {

                cartButton.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();

                        addProductFromCard(
                            index
                        );

                    }
                );

            }


            // ------------------------------------------
            // رفتن به صفحه محصول
            // ------------------------------------------

            card.addEventListener(
                "click",
                function() {

                    window.location.href =
                        `product.html?id=${index}`;

                }
            );


            productList.appendChild(
                card
            );

        }
    );


    // ------------------------------------------
    // هیچ محصولی پیدا نشد
    // ------------------------------------------

    if (
        filteredProducts.length === 0
    ) {

        productList.innerHTML = `

            <div class="no-products">

                <div>
                    🔎
                </div>

                <h3>
                    محصولی پیدا نشد
                </h3>

                <p>
                    عبارت دیگری را جستجو کنید.
                </p>

            </div>

        `;

    }

}


// ==========================================
// جستجو
// ==========================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchClear =
    document.getElementById(
        "searchClear"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            if (searchClear) {

                searchClear.style.display =
                    this.value.trim()
                        ? "flex"
                        : "none";

            }


            renderProducts();

        }
    );

}


// ==========================================
// پاک کردن جستجو
// ==========================================

if (
    searchInput &&
    searchClear
) {

    searchClear.addEventListener(
        "click",
        function() {

            searchInput.value = "";

            searchClear.style.display =
                "none";

            renderProducts();

            searchInput.focus();

        }
    );

}


// ==========================================
// دسته‌بندی
// ==========================================

const categoryButtons =
    document.querySelectorAll(
        ".category-button"
    );


categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category ||
                    "all";


                renderProducts();

            }
        );

    }
);


// ==========================================
// Sort
// ==========================================

const sortSelect =
    document.getElementById(
        "sortSelect"
    );


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function() {

            selectedSort =
                this.value;


            renderProducts();

        }
    );

}


// ==========================================
// علاقه‌مندی
// ==========================================

function toggleFavorite(index) {

    const position =
        favorites.indexOf(index);


    if (position !== -1) {

        favorites.splice(
            position,
            1
        );

    } else {

        favorites.push(index);

    }


    localStorage.setItem(
        "tiamFavorites",
        JSON.stringify(
            favorites
        )
    );


    renderProducts();

}


// ==========================================
// افزودن محصول از کارت
// ==========================================

function addProductFromCard(index) {

    if (!products[index]) {
        return;
    }


    addToCart(
        products[index]
    );

}


// ==========================================
// افزودن به سبد
// ==========================================

function addToCart(product) {

    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(
            function(item) {

                return (
                    item.name ===
                    product.name
                );

            }
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity || 0
            ) + 1;

    }

    else {

        const productImages =
            Array.isArray(product.images) &&
            product.images.length
                ? product.images
                : product.image
                    ? [product.image]
                    : [];


        cart.push({

            name:
                product.name,

            description:
                product.description || "",

            price:
                Number(
                    product.price || 0
                ),

            image:
                product.image ||
                productImages[0] ||
                "",

            images:
                productImages,

            category:
                product.category || "",

            quantity:
                1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


// ==========================================
// ذخیره سبد
// ==========================================

function saveCart() {

    localStorage.setItem(
        "tiamCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// بروزرسانی سبد
// ==========================================

function updateCart() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    let count = 0;


    cart.forEach(
        function(item) {

            count +=
                Number(
                    item.quantity || 0
                );

        }
    );


    if (cartCount) {

        cartCount.textContent =
            count;

    }


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    // اگر این المنت‌ها در صفحه نیستند
    if (
        !cartItems ||
        !cartTotal
    ) {

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(
        function(item, index) {

            const quantity =
                Number(
                    item.quantity || 0
                );


            const price =
                Number(
                    item.price || 0
                );


            total +=
                price * quantity;


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <img
                    src="${item.image || "images/no-image.jpg"}"
                    alt="${item.name}"
                >


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>


                    <strong>

                        ${formatPrice(price)}
                        تومان

                    </strong>


                    <div class="quantity">

                        <button
                            type="button"
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >

                    🗑

                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    cartTotal.textContent =
        `${formatPrice(total)} تومان`;


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                🛒

                <p>
                    سبد خرید خالی است.
                </p>

            </div>

        `;

    }


    saveCart();

}


// ==========================================
// تغییر تعداد
// ==========================================

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(
            cart[index].quantity || 0
        ) + amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    updateCart();

}


// ==========================================
// حذف از سبد
// ==========================================

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    updateCart();

}


// ==========================================
// باز کردن سبد
// ==========================================

function openCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


// ==========================================
// بستن سبد
// ==========================================

function closeCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ==========================================
// Checkout
// ==========================================

function checkout() {

    if (
        cart.length === 0
    ) {

        alert(
            "سبد خرید خالی است."
        );

        return;

    }


    const checkoutModal =
        document.getElementById(
            "checkoutModal"
        );


    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    let total = 0;


    cart.forEach(
        function(item) {

            total +=
                Number(
                    item.price || 0
                ) *
                Number(
                    item.quantity || 0
                );

        }
    );


    if (checkoutTotal) {

        checkoutTotal.textContent =
            `${formatPrice(total)} تومان`;

    }


    if (checkoutModal) {

        checkoutModal.classList.add(
            "active"
        );

    }

}


// ==========================================
// بستن Checkout
// ==========================================

function closeCheckout() {

    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ==========================================
// ارسال سفارش به واتساپ
// ==========================================

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (
                cart.length === 0
            ) {

                alert(
                    "سبد خرید خالی است."
                );

                return;

            }


            const name =
                document
                    .getElementById(
                        "customerName"
                    )
                    ?.value
                    .trim() || "";


            const phone =
                document
                    .getElementById(
                        "customerPhone"
                    )
                    ?.value
                    .trim() || "";


            const address =
                document
                    .getElementById(
                        "customerAddress"
                    )
                    ?.value
                    .trim() || "";


            const note =
                document
                    .getElementById(
                        "customerNote"
                    )
                    ?.value
                    .trim() || "";


            let message =
                "سلام، سفارش جدید دارم 🌿\n\n";


            message +=
                `👤 نام: ${name}\n`;


            message +=
                `📞 شماره تماس: ${phone}\n\n`;


            message +=
                "🛒 محصولات:\n";


            let total = 0;


            cart.forEach(
                function(item) {

                    const itemTotal =
                        Number(
                            item.price || 0
                        ) *
                        Number(
                            item.quantity || 0
                        );


                    total +=
                        itemTotal;


                    message +=
                        `• ${item.name} × ${item.quantity} — ${formatPrice(itemTotal)} تومان\n`;

                }
            );


            message +=
                `\n💰 مبلغ کل: ${formatPrice(total)} تومان\n`;


            message +=
                `\n📍 آدرس:\n${address}\n`;


            if (note) {

                message +=
                    `\n📝 توضیحات:\n${note}\n`;

            }


            const phoneNumber =
                "989035668639";


            const whatsappURL =
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// ==========================================
// مشاهده سریع
// ==========================================

function quickView(index) {

    const product =
        products[index];


    if (!product) {
        return;
    }


    let modal =
        document.getElementById(
            "quickViewModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "quickViewModal";


        modal.className =
            "quick-view-modal";


        document.body.appendChild(
            modal
        );

    }


    modal.innerHTML = `

        <div class="quick-view-box">

            <button
                type="button"
                class="quick-view-close"
                onclick="closeQuickView()"
            >

                ×

            </button>


            <div class="quick-view-image">

                <img
                    src="${product.image || "images/no-image.jpg"}"
                    alt="${product.name}"
                >

            </div>


            <div class="quick-view-info">

                <span class="product-category">

                    ${product.category || "محصول چوبی"}

                </span>


                <h2>

                    ${product.name}

                </h2>


                <div class="product-rating">

                    ★★★★★

                    <small>
                        5.0
                    </small>

                </div>


                <p>

                    ${product.description || ""}

                </p>


                <strong class="quick-view-price">

                    ${formatPrice(product.price)}
                    تومان

                </strong>


                <button
                    type="button"
                    class="quick-cart-button"
                    onclick="addProductFromQuickView(${index})"
                >

                    🛒 افزودن به سبد خرید

                </button>


                <button
                    type="button"
                    class="quick-detail-button"
                    onclick="goToProduct(${index})"
                >

                    مشاهده صفحه محصول

                </button>

            </div>

        </div>

    `;


    modal.classList.add(
        "active"
    );


    // بستن با کلیک روی فضای بیرونی

    modal.onclick =
        function(event) {

            if (
                event.target === modal
            ) {

                closeQuickView();

            }

        };

}


// ==========================================
// بستن مشاهده سریع
// ==========================================

function closeQuickView() {

    const modal =
        document.getElementById(
            "quickViewModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ==========================================
// افزودن از مشاهده سریع
// ==========================================

function addProductFromQuickView(index) {

    if (!products[index]) {
        return;
    }


    addToCart(
        products[index]
    );


    closeQuickView();

}


// ==========================================
// رفتن به صفحه محصول
// ==========================================

function goToProduct(index) {

    if (!products[index]) {
        return;
    }


    window.location.href =
        `product.html?id=${index}`;

}


// ==========================================
// منوی موبایل
// ==========================================

function toggleMenu() {

    const menu =
        document.querySelector(
            ".menu"
        );


    if (menu) {

        menu.classList.toggle(
            "active"
        );

    }

}


// ==========================================
// بستن Modal با Escape
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeQuickView();

            closeCart();

            closeCheckout();

        }

    }
);


// ==========================================
// شروع
// ==========================================

renderProducts();

updateCart();