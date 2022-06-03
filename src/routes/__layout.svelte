<script lang="ts">
    import '../styles/app.css';
    import Footer from '../components/Footer.svelte';
    import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
<slot/>
<Footer/>