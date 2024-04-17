<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <i class="fa-solid fa-book-open-reader"></i>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'Home' }" class="nav-link">
                    Home
                    <i class="fas fa-address-home"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>