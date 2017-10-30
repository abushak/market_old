<?php
/**
 * Created by PhpStorm.
 * User: Quy
 * Date: 11/25/2015
 * Time: 2:59 PM
 */

namespace Drupal\custom_breadcrumb\Breadcrumb;

use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Link;
use Drupal\views\Views;
use Drupal\Core\Url;

class CustomViewBreadcrumbBuilder implements BreadcrumbBuilderInterface {
    use StringTranslationTrait;

    /**
     * @inheritDoc
     */
    public function applies(RouteMatchInterface $route_match) {
        $parameters = $route_match->getParameters()->all();

        if (isset($parameters['view_id'])) {
            return $parameters['view_id'] == 'articles'
            || $parameters['view_id'] == 'blogs'
            || $parameters['view_id'] == 'faq';
        }

        return false;
    }

    /**
     * @inheritDoc
     */
    public function build(RouteMatchInterface $route_match) {
        $breadcrumb = new Breadcrumb();
        $breadcrumb->addCacheContexts(['route']);

        $links[] = Link::createFromRoute($this->t('Home'), '<front>');

        $parameters = $route_match->getParameters()->all();
        $view_id = $parameters['view_id'];
        $display_id = $parameters['display_id'];
        $view = Views::getView($view_id);

        // parent breadcrumb link
        $parent_title = $view->getTitle();
        $parent_link = '/' . $view->getPath();
        $links[] = Link::fromTextAndUrl($parent_title, Url::fromUserInput($parent_link));

        // child breadcrumb link
        $view->setDisplay($display_id);
        $child_title = $view->getTitle();
        $child_link = '/' . $view->getPath();
        if (strcmp($parent_link, $child_link) != 0) {
            $links[] = Link::fromTextAndUrl($child_title, Url::fromUserInput($child_link));
        }

        return $breadcrumb->setLinks($links);
    }
}