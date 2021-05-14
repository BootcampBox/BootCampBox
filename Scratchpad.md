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

### Form2 Example Usage

``` 

 <form action="https://form2channel.com?form=sample" method="POST" enctype="multipart/form-data">

                <!-- Recipients for the form info -->
                <input name="formto_slack" type="hidden" value="https://hooks.slack.com/services/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">
                <!-- Form fields need name and value attributes -->
                TextField:
                <input type="text" name="TextField" value="TextValue"> TextArea: ption>
                </select>
                <label>CheckBox1: <input name="CheckBox1" type="checkbox" value="checked" checked></label>
                <label>CheckBox2: <input name="CheckBox2" type="checkbox"></label>
                <label>CheckBox3: <input name="CheckBox3" type="checkbox" checked></label> RadioButton:
                <label><input name="RadioButton" type="radio" value="checked" checked> Checked</label>
                <label><input name="RadioButton" type="radio" value="unchecked"> Unchecked</label> Single File:
                <input type="file" name="fieldname1"> Multiple Files:
                <input type="file" name="fieldname2[]" multiple>
                <button type="Submit">Send</button>
            </form>

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