# Scratchpad

## HTML

---

Place in head tag.
```
<head>
<!--Google Sign-in-->
<script src="https://apis.google.com/js/platform.js" async defer></script>

   <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>


<body>
    <div id="g_id_onload" data-client_id="993767314328-rfm0arijtb8gk5h4irlv9cu4hip82lue.apps.googleusercontent.com" data-login_uri="http//localhost:5502" data-ux_mode="redirect" data-auto_prompt="false">
    </div>
    <div class="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="sign_in_with" data-shape="rectangular" data-logo_alignment="left">
    </div>
</body>
```

## JS 

---

```

<!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>