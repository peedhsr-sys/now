function searchdata() {
    
    if ($("#txtRC").val() == "") {
        swal("कृपया राशन कार्ड संख्या डालें |");
        $("#txtRC").val("");
        $("#txtCaptcha").val('');
        captcharefresh();
        return;
    }
    else if ($("#txtCaptcha").val() == "") {
        swal("कृपया कैप्चा भरे |");
        $("#txtRC").val("");
        $("#txtCaptcha").val('');
        captcharefresh();
        return;
    }
    else {
        if ($("#txtCaptcha").val() == $("#hdCaptcha").val()) {
            if ($("#txtRC").val() == "") {
                swal("कृपया राशन कार्ड संख्या डालें |");
                $("#txtRC").val("");
                captcharefresh();
                return;
            }
            else {
                SendOTPRationCard()
                //BindTrackingRationCard();

             

            }
        }
        else {
            swal("कृपया सही कैप्चा भरे |");
            $("#txtRC").val("");
            $("#txtCaptcha").val('');
            captcharefresh();
            return;
        }
    }
}

$(document).ready(function () {
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    $('#txtRC').on("keypress", function (e) {
       
        if (e.keyCode == 13) {
            $('#btnSearch').click();
           // BindTrackingRationCard();
            return false;
        }
    });
    //$('#txtOTP').keypress(function (e) {

    //    var charCode = (e.which) ? e.which : event.keyCode

    //    if (String.fromCharCode(charCode).match(/[^0-9]/g))

    //        return false;

    //});
    $('#txtRC').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode

        if (String.fromCharCode(charCode).match(/[^0-9]/g))

            return false;

    });
    //$('#txtOTP').bind('copy paste cut', function (e) {
    //    e.preventDefault();
       
    //});
    $('#txtRC').bind('copy paste cut', function (e) {
        e.preventDefault();

    });
  
});

function otp() {
  
    var randomnumber = "";

    var pass = "";

    randomnumber = $('#OTRNo').val();

    pass = sha512($('#otpvalue').val());

    $('#HiddenField2').val( sha512(pass + randomnumber));

    //document.getElementById("<%=txtotp.ClientID%>").value = "";
    return true;


}

function captcharefresh() {

  
    var dataobject = {
       Flag:""

    };
    $.ajax({
        url: "NFSARCSearch.aspx/RefershCaptcha",
        type: "POST",
        contentType: false,
        processData: false,
        //data: dataobject,
      data: JSON.stringify(dataobject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
  
           // var JSON = eval(data.d);
         
            //var html = '';
            $("#hdCaptcha").val(data.d);
            $("#imgCaptcha").attr("src", "Captcha.ashx?id="+data.d+"");

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {



            alert('Server is not responding.');

        }
    });
}

function changeBack() {
    $("#divMain").show();
    $("#txtRC").val('');
    $('#txtRC').removeAttr('disabled');
    $("#divdisplay").hide();
    $("#divBack").hide();
    $("#txtCaptcha").val('');
    captcharefresh();
    $('.otp-form .otp-field').val('');
    $('#txtRC').removeAttr("disabled");
    captcharefresh();
    $('#divCaptcha').show();
    $('#divBCaptcha').show();
    $('#divOTP').hide();
    $('#divBOTP').hide();
    $('#txtOTP').val('');
}
function changeBackRedirect() {
    window.location.replace("NFSARCSearch.aspx" );
}
function BindRationCard() {
   
    var dataobject = {
        RCID: $("#txtRC").val().trim(),
    };

    $.ajax({
        url: "NFSARCSearch.aspx/BindData",
        type: "POST",
        contentType: false,
        processData: false,
        //data: dataobject,
        data: JSON.stringify(dataobject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
        
            var JSON = eval(data.d);
            var html = '';
            if ((JSON[0].Flag == "0")) {
                window.location.replace("ViewRC.aspx?Details=" + JSON[0].data);
            }
            else {
                swal(JSON[0].data);
                $("#txtRC").val("");
                $("#txtCaptcha").val('');
                $('#txtRC').removeAttr("disabled");
                captcharefresh();
                $('#divCaptcha').show();
                $('#divBCaptcha').show();
                $('#divOTP').hide();
                $('#divBOTP').hide();
                $('#txtOTP').val('');
                $('.otp-form .otp-field').val("");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {



            alert('Server is not responding.');

        }
    });

}
function SendOTPRationCard() {
    
    var dataobject = {
        Id: $("#txtRC").val().trim()
    };

    $.ajax({
        url: "NFSARCSearch.aspx/SendOTPRationCard",
        type: "POST",
        contentType: false,
        processData: false,
        //data: dataobject,
        data: JSON.stringify(dataobject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
           
            var JSON = eval(data.d);
            var html = '';
            if ((JSON[0].Flag == "0"))
            {
                $('#timer').html('5:00');
                $(".otp-form .otp-field").removeAttr("style");
                $('#txtRC').attr("disabled","disabled");
                $('#divCaptcha').hide();
                $('#divBCaptcha').hide();
                $('#divOTP').show();
                $('#divBOTP').show();
                $("#OTRNo").val(JSON[0].OTPRNo);
               
                $("#mobileno").val(JSON[0].MobileNo);
                $("#spnmobile").html(JSON[0].MaskData);
                $('#txtOTP').val('');
                $('#divBack').show();
                timer();
                $(".otp-form *:input[type!=hidden]:first").focus();
            }
            else if ((JSON[0].Flag == "1")) {
                swal(JSON[0].msg);
                $("#txtRC").val("");
                $("#txtCaptcha").val('');
                $('#txtRC').removeAttr("disabled");
                captcharefresh();
                $('#divCaptcha').show();
                $('#divBCaptcha').show();
                $('#divOTP').hide();
                $('#divBOTP').hide();
                $('#txtOTP').val('');
                $('.otp-form .otp-field').val("");
            }
            //for (var i = 0; i < JSON.length; i++) {
            //    srno = i + 1;
            //    html += "<div id='L" + JSON[i].TrackLevel + "' class='step'> <span class='icon'> " + JSON[i].TrackIcon + " </span> <span class='text'>" + JSON[i].TrackDescription + "</span> </div>"
            //}

           // $('#divTrack').html(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

           

            alert('Server is not responding.');

        }
    });

}

function changeIcon() {
   
    if ($("#btnOpen").attr('aria-expanded')=='true') {
      
        $("#iplus").hide();
        $("#iminus").show();
    }
    else if ($("#btnOpen").attr('aria-expanded') == 'false'){
        $("#iplus").show();
        $("#iminus").hide();
        
    }
}



function otpverify() {
   
    otp();
    
    var dataobject = {
        Id: $("#txtRC").val().trim(),
        Mobile_No: $('#mobileno').val().trim(),
        EncryptData: $("#HiddenField2").val().trim(),
        Garbage: $("#OTRNo").val().trim(),
    };
    $.ajax({
        url: "NFSARCSearch.aspx/OTPVerify",
        type: "POST",
        contentType: false,
        processData: false,
        //data: dataobject,
        data: JSON.stringify(dataobject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
           
            var JSON = eval(data.d);
            var html = '';
            if ((JSON[0].Flag == "0")) {

                BindRationCard();
              
            }
            else if ((JSON[0].Flag == "1")) {
                if((JSON[0].rslt == "I"))
                {
                    swal(JSON[0].msg);
                    $('#divOTP').show();
                    $('#divBOTP').show();
                    $('.otp-form .otp-field').val("");
                    $(".otp-form *:input[type!=hidden]:first").focus();
                }
                else
                {
                    swal(JSON[0].msg);
                    $("#txtRC").val("");
                    $("#txtCaptcha").val('');
                    $('#txtRC').removeAttr("disabled");
                    captcharefresh();
                    $('#divCaptcha').show();
                    $('#divBCaptcha').show();
                    $('#divOTP').hide();
                    $('#divBOTP').hide();
                    $('#txtOTP').val('');
                    $('.otp-form .otp-field').val("");
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {



            alert('Server is not responding.');

        }
    });
}

$(document).ready(function () {
 
    $(".otp-form *:input[type!=hidden]:first").focus();
    let otp_fields = $(".otp-form .otp-field"),
        otp_value_field = $(".otp-form .otp-value");
    otp_fields
        .on("input", function (e) {
            $(this).val(
                $(this)
                    .val()
                    .replace(/[^0-9]/g, "")
            );
            let opt_value = "";
            otp_fields.each(function () {
                let field_value = $(this).val();
                if (field_value != "") opt_value += field_value;
            });
            otp_value_field.val(opt_value);
          
        })
        .on("keyup", function (e) {
           
            let key = e.keyCode || e.charCode;
            if (key == 8 || key == 46 || key == 37 || key == 40) {
                // Backspace or Delete or Left Arrow or Down Arrow
                $(this).prev().focus();
                $('#btnOTP').attr("disabled", "disabled");
            } else if (key == 38 || key == 39 || $(this).val() != "") {
                // Right Arrow or Top Arrow or Value not empty
                $(this).next().focus();
                if ($('#otpvalue').val().length == 6) {
                    $('#btnOTP').removeAttr("disabled");
                }
            }
           
          
        })
        .on("paste", function (e) {
            let paste_data = e.originalEvent.clipboardData.getData("text");
            let paste_data_splitted = paste_data.split("");
            $.each(paste_data_splitted, function (index, value) {
                otp_fields.eq(index).val(value);
            });
        });
});


function timer() {
    var timeLimitInMinutes = 5;
    var timeLimitInSeconds = timeLimitInMinutes * 60;
    var timerElement = document.getElementById('timer');

    function startTimer() {
        timeLimitInSeconds--;
        var minutes = Math.floor(timeLimitInSeconds / 60);
        var seconds = timeLimitInSeconds % 60;

        if (timeLimitInSeconds < 0) {
            timerElement.textContent = '00:00';
            clearInterval(timerInterval);
            return;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (seconds <= 0) {
           
            $('#btnOTP').attr('disabled', 'disabled');
            $('.otp-form .otp-field').attr("style", "pointer-events:none");
            $('#lnkresend').show();
        }
        else {
            $('#lnkresend').hide();
        }
        timerElement.textContent = minutes + ':' + seconds;
    }

    var timerInterval = setInterval(startTimer, 1000);

}
function resendotp() {
    
    
    SendOTPRationCard();
}