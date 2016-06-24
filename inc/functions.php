<?php

function generateAllBlocksTitle($title, $index = "")
{
    $id = urlencode($title);
    $blockIndex = isset($index) ? '<span class="color-brown" style="border-radius: 100%;padding: 0 10px;font-family: monospace;">' . $index . '</span>' : '';

    return '<!--documentation-->
    <div id="' . $index . $id . '" class="nur-help-title"><hr style="border-top: 3px solid #999; margin: 1em 0 0 0;">
    <h2 class="title-main color-brown section mod-full" style="margin:0; padding: 1em 0;background-color: cornsilk;">
    <a class="section-inner" style="display: block;" href="#' . $index . $id . '">' . $blockIndex . ' ' . $title . '</a></h2><!--/documentation-->
    <hr style="border-top: 3px solid #999; margin: 0 0 1em 0;"></div>';
}


/**
 * @param string $toggleid set the id of toggle
 * @param string $togglegroup set the group of toggle
 * @param string $title display the popin title
 * @param string $inculde include file on folder inc/popins without the .php extension
 *
 * @return mixed
 */
function popin($toggleid, $togglegroup = 'popin', $title, $inculde)
{

    ob_start();
    include "popins/popin-master.php";
    $template = ob_get_contents();
    ob_end_clean();
    ob_start();
    include "popins/" . $inculde . ".php";
    $content = ob_get_contents();
    ob_end_clean();

    $search = array("#toggleid", "#togglegroup", "#title", "#content");
    $replace = array($toggleid, $togglegroup, $title, $content);
    $html = str_replace($search, $replace, $template);

    return $html;
}


/**
 * generate a fake select CSS dropdown form compatible
 * @param string $initial
 * @param string $id
 * @param string $type
 * @param string $labels ...
 * @return string HTML template
 */
function dropdown_select($initial = '0', $id, $type, $labels)
{

    $innerTemplate = '';
    if (func_num_args() > 4) {
        for ($i = 3; $i < func_num_args(); $i++) {
            $a = func_get_arg($i);
            $innerTemplate .= <<<"INNERCONTENT"
                                    <option value="$a">$a</option>
INNERCONTENT;
        }
    }
    $template2 = <<<"CONTENT"
                            <select name="adult" id="$id" class="JS_resa-select JS_select_people" data-type="$type">
                                <option value="$initial">$initial</option>
                                $innerTemplate
                            </select>
CONTENT;
    return $template2;
}

/**
 * @param int $levels
 *
 * @return string Breadcrumb HTML
 */
function breadcrumb()
{

    $numargs = func_num_args();
    $arg_list = func_get_args();

    $bread = '<div class="breadcrumb"><ul>';
    for ($i = 0; $i < $numargs - 1; $i++) {
        $bread .= "<li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\" class=\"list-item\"><a href='#' class=\"list-item-link\" itemprop=\"url\"><span itemprop=\"title\"> " . $arg_list[$i] . "</span></a></li>\n";
    }
    $bread .= '<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="list-item">' . $arg_list[$numargs - 1] . '</li>';

    $bread .= '</ul></div>';

    return $bread;
}

function getcook($key, $val)
{
    return @$_COOKIE[$key] === $val;
}
function youtubedebug()
{
    preg_match('/equesto/', $_SERVER['HTTP_HOST'], $matches, PREG_OFFSET_CAPTURE, 3);

    if(count($matches)){
        $html = "/pm/empty.htm#";
    }
    else{
        $html = '';
    }
    return $html;
}