<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="au theme template">
    <meta name="author" content="Hau Nguyen">
    <meta name="keywords" content="au theme template">

    <!-- Title Page-->
    <title>GarudaBot - @yield('title')</title>

    <!-- Fontfaces CSS-->
    <link href="css/font-face.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all">
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">
    <link href="vendor/awesomplete-gh-pages/awesomplete.css" rel="stylesheet"/>

    <!-- materializecss -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> -->
    <!-- Main CSS-->
    <link href="css/theme.css" rel="stylesheet" media="all">
    <link href="css/copytrading.css" rel="stylesheet" media="all">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <!-- Additional Script -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
    <script src="vendor/awesomplete-gh-pages/awesomplete.js" async></script>
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.4/awesomplete.theme.min.css" integrity="sha256-69D8NC510+70mXDXLKGhl/ml8WHORkNgABErEV1aoVE=" crossorigin="anonymous" /> -->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.4/awesomplete.min.js" integrity="sha256-5pJRRi3xV/K9xpez4N3jlLTH2Jy0ErXkMML4sjnj6Xc=" crossorigin="anonymous"></script> -->

</head>
<body class="animsition">
<div class="page-wrapper">
    <!-- HEADER MOBILE-->
    <header class="header-mobile d-block d-lg-none">
        <div class="header-mobile__bar">
            <div class="container-fluid">
                <div class="header-mobile-inner">
                    <a class="logo" href="index.html">
                        <img src="images/icon/logo.png" alt="CoolAdmin"/>
                    </a>
                    <button class="hamburger hamburger--slider" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                    </button>
                </div>
            </div>
        </div>
        <nav class="navbar-mobile">
            <div class="container-fluid">
                <ul class="navbar-mobile__list list-unstyled">
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-tachometer-alt"></i>Dashboard</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="index.html">Dashboard 1</a>
                            </li>
                            <li>
                                <a href="index2.html">Dashboard 2</a>
                            </li>
                            <li>
                                <a href="index3.html">Dashboard 3</a>
                            </li>
                            <li>
                                <a href="index4.html">Dashboard 4</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="chart.html">
                            <i class="fas fa-chart-bar"></i>Charts</a>
                    </li>
                    <li>
                        <a href="table.html">
                            <i class="fas fa-table"></i>Tables</a>
                    </li>
                    <li>
                        <a href="form.html">
                            <i class="far fa-check-square"></i>Forms</a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-calendar-alt"></i>Calendar</a>
                    </li>
                    <li>
                        <a href="map.html">
                            <i class="fas fa-map-marker-alt"></i>Maps</a>
                    </li>
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-copy"></i>Pages</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="login.html">Login</a>
                            </li>
                            <li>
                                <a href="register.html">Register</a>
                            </li>
                            <li>
                                <a href="forget-pass.html">Forget Password</a>
                            </li>
                        </ul>
                    </li>
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-desktop"></i>UI Elements</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="button.html">Button</a>
                            </li>
                            <li>
                                <a href="badge.html">Badges</a>
                            </li>
                            <li>
                                <a href="tab.html">Tabs</a>
                            </li>
                            <li>
                                <a href="card.html">Cards</a>
                            </li>
                            <li>
                                <a href="alert.html">Alerts</a>
                            </li>
                            <li>
                                <a href="progress-bar.html">Progress Bars</a>
                            </li>
                            <li>
                                <a href="modal.html">Modals</a>
                            </li>
                            <li>
                                <a href="switch.html">Switchs</a>
                            </li>
                            <li>
                                <a href="grid.html">Grids</a>
                            </li>
                            <li>
                                <a href="fontawesome.html">Fontawesome Icon</a>
                            </li>
                            <li>
                                <a href="typo.html">Typography</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- END HEADER MOBILE-->

    <!-- MENU SIDEBAR-->
    <aside class="menu-sidebar d-none d-lg-block">
        <div class="logo">
            <a href="#">
                <img src="images/icon/logo.png" alt="Cool Admin"/>
            </a>
        </div>
        <div class="menu-sidebar__content js-scrollbar1">
            <nav class="navbar-sidebar">
                <ul class="list-unstyled navbar__list">
{{--                    <li class="has-sub">--}}
{{--                        <a class="js-arrow" href="#">--}}
{{--                            <i class="fas fa-tachometer-alt"></i>Dashboard</a>--}}
{{--                        <ul class="list-unstyled navbar__sub-list js-sub-list">--}}
{{--                            <li>--}}
{{--                                <a href="index.html">Dashboard 1</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="index2.html">Dashboard 2</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="index3.html">Dashboard 3</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="index4.html">Dashboard 4</a>--}}
{{--                            </li>--}}
{{--                        </ul>--}}
{{--                    </li>--}}
                    <li class="active">
                        <a href="chart.html">
                            <i class="fas fa-chart-bar"></i>Homepage</a>
                    </li>
                    <li>
                        <a href="table.html">
                            <i class="fas fa-table"></i>Logout</a>
                    </li>
{{--                    <li>--}}
{{--                        <a href="form.html">--}}
{{--                            <i class="far fa-check-square"  href="{{ route('login') }}"></i>Login</a>--}}
{{--                    </li>--}}
{{--                    <li>--}}
{{--                        <a href="#">--}}
{{--                            <i class="fas fa-calendar-alt"></i>Calendar</a>--}}
{{--                    </li>--}}
{{--                    <li>--}}
{{--                        <a href="map.html">--}}
{{--                            <i class="fas fa-map-marker-alt"></i>Maps</a>--}}
{{--                    </li>--}}
{{--                    <li class="has-sub">--}}
{{--                        <a class="js-arrow" href="#">--}}
{{--                            <i class="fas fa-copy"></i>Pages</a>--}}
{{--                        <ul class="list-unstyled navbar__sub-list js-sub-list">--}}
{{--                            <li>--}}
{{--                                <a href="login.html">Login</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="register.html">Register</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="forget-pass.html">Forget Password</a>--}}
{{--                            </li>--}}
{{--                        </ul>--}}
{{--                    </li>--}}
{{--                    <li class="has-sub">--}}
{{--                        <a class="js-arrow" href="#">--}}
{{--                            <i class="fas fa-desktop"></i>UI Elements</a>--}}
{{--                        <ul class="list-unstyled navbar__sub-list js-sub-list">--}}
{{--                            <li>--}}
{{--                                <a href="button.html">Button</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="badge.html">Badges</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="tab.html">Tabs</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="card.html">Cards</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="alert.html">Alerts</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="progress-bar.html">Progress Bars</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="modal.html">Modals</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="switch.html">Switchs</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="grid.html">Grids</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="fontawesome.html">Fontawesome Icon</a>--}}
{{--                            </li>--}}
{{--                            <li>--}}
{{--                                <a href="typo.html">Typography</a>--}}
{{--                            </li>--}}
{{--                        </ul>--}}
{{--                    </li>--}}
                </ul>
            </nav>
        </div>
    </aside>
    <!-- END MENU SIDEBAR-->

    <!-- PAGE CONTAINER-->
    <div class="page-container">
        <!-- MAIN CONTENT-->
        <div class="main-content">
            @yield('content')
        </div>


    </div>
</div>
</div>
<!-- END MAIN CONTENT-->
</div>
<!-- END PAGE CONTAINER-->

</div>

<!-- Jquery JS-->
<script src="vendor/jquery-3.2.1.min.js"></script>
<!-- Bootstrap JS-->
<script src="vendor/bootstrap-4.1/popper.min.js"></script>
<script src="vendor/bootstrap-4.1/bootstrap.min.js"></script>
<!-- Vendor JS       -->
<script src="vendor/slick/slick.min.js">
</script>
<script src="vendor/wow/wow.min.js"></script>
<script src="vendor/animsition/animsition.min.js"></script>
<script src="vendor/bootstrap-progressbar/bootstrap-progressbar.min.js">
</script>
<script src="vendor/counter-up/jquery.waypoints.min.js"></script>
<script src="vendor/counter-up/jquery.counterup.min.js">
</script>
<script src="vendor/circle-progress/circle-progress.min.js"></script>
<script src="vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
<script src="vendor/chartjs/Chart.bundle.min.js"></script>
<script src="vendor/select2/select2.min.js">
</script>

<!-- Main JS-->

<script src="js/main.js"></script>
<script src="js/mainpage.js"></script>

<!-- Main JS-->
</body>

</html>
<!-- end document-->