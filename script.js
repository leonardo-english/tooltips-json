<script>
$('head').append("<style>.tooltip {cursor: help;white-space: nowrap;}strong span.definition-tooltip {z-index: 1;font-weight: 100;font-size: 85%;position: absolute;width: max-content;max-width: 250px;background: black;color: white;padding: 4px 17px;top: 30px;left: 2px; white-space: pre-wrap;} span.definition-tooltip-arrow {border-left: 7px solid transparent;border-right: 7px solid transparent;border-bottom: 7px solid black;position: absolute;}@media screen and (max-width: 500px){strong span.definition-tooltip{ }}</style>") 
 var EXTERNAL_JSON_FILE_URL = "https://raw.githubusercontent.com/leonardo-english/tooltips-json/master/ELFCM14.json";
$.getJSON(EXTERNAL_JSON_FILE_URL, function( definitions ) {
  $("#transcript-text strong").each(function() {
      var word = $(this);
      var val = word.html();
      if(definitions[val.toUpperCase()]) {
        // word.append("<span class='definition-tooltip'>"+ definitions[val.toUpperCase()].Definition +"</span><span class='definition-tooltip-arrow'></span>")
        word.addClass("tooltip");
        word.attr("data-definition",definitions[val.toUpperCase()].Definition);
      }
  });
  $("#transcript-text strong.tooltip").off()
  $("#transcript-text strong.tooltip").on('mouseover',function() {
    var word = $(this);
    var left = word.position().left;
    var top = word.position().top;
    var boundaryRight = document.getElementById("transcript-text").getBoundingClientRect().right;
    var arrowLeft = left + 5;

    var tooltip = $("<span class='definition-tooltip'></span>")
    tooltip.html(word.attr('data-definition'));

    var arrow = $("<span class='definition-tooltip-arrow'></span>");

    word.append(tooltip)
    word.append(arrow)

    var maxWidth = tooltip.width();
    if(left + maxWidth > boundaryRight) {
      arrowLeft = left + word.width() - 25
      left = left - (left + maxWidth - boundaryRight + 30);
    }

    arrow.css("left",arrowLeft + "px");
    arrow.css("top",top + 30 - 7 + "px");

    tooltip.css("left",left + "px");
    tooltip.css("top",top + 30 + "px");
  });

  $("#transcript-text strong.tooltip").mouseout(function(){ $('.definition-tooltip').remove();$('.definition-tooltip-arrow').remove(); });
});
</script>