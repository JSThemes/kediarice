jQuery(document).ready(function(){let wp_content=jQuery("#wpbody-content").length?jQuery("#wpbody-content"):jQuery("body");wp_content.on("click",".btn-insert-tooltip",function(b){b.preventDefault();jQuery(this).closest("label").after(jQuery(".block-help-template:last").clone().removeAttr("id").removeClass("block-help-template"))});wp_content.on("click",".dashicons-dismiss",function(b){b.preventDefault();jQuery(this).closest(".help-block").remove()});wp_content.on("click",".btn-copy-widget-id",function(b){b.preventDefault();let link=jQuery(this);link.closest("form").find(".form-control").val(link.data("ti-id")).trigger("change");TImanageCopyLinks(link.closest("form"),link)});wp_content.on("blur",".trustindex-widget-admin .form-control",function(){let input=jQuery(this);if(input.attr("required")!="required"||input.val()){input.prev().removeClass("text-danger")}else{input.prev().addClass("text-danger")}TImanageCopyLinks(input.closest("form"),input.closest("form").find("[data-ti-id='"+input.val()+"']"))})});function TImanageCopyLinks(c,d){let selected_class="text-danger";c.find(".btn-copy-widget-id."+selected_class).each(function(b,a){jQuery(a).removeClass(selected_class).find(".dashicons").attr("class","dashicons dashicons-admin-post")});if(d){d.addClass(selected_class).find(".dashicons").attr("class","dashicons dashicons-yes")}};