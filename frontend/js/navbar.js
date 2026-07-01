const navbar = document.getElementById("navbar");

navbar.innerHTML = `

<nav class="navbar">

    <div class="logo">

        <img src="images/logo.jpeg">

        <h2>OneDesk</h2>

    </div>

    <div class="nav-links">

        <a class="active" href="index.html">
            Dashboard
        </a>

        <a href="tasks.html">
            Tasks
        </a>

        <a href="notes.html">
            Notes
        </a>

        <a href="health.html">
            Health
        </a>

        <a href="water.html">
            Water
        </a>

        <a href="statistics.html">
            Statistics
        </a>

    </div>

    <div class="nav-right">

        <input
        class="search"
        placeholder="Search...">

        <div
          class="icon-btn"
            onclick="window.location.href='notifications.html'">

            <i class="ti ti-bell"></i>

        </div>
        <div class="avatar">
            K
        </div>

    </div>

</nav>

`;