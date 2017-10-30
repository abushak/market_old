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

class CustomContactFormBreadcrumbBuilder implements BreadcrumbBuilderInterface {
    use StringTranslationTrait;

    /**
     * @inheritDoc
     */
    public function applies(RouteMatchInterface $route_match) {
        $parameters = $route_match->getParameters()->all();

        if (array_key_exists('contact_form', $parameters)) {
            return true;
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
        $links[] = Link::fromTextAndUrl($this->t('Contact us'), Url::fromUserInput('/contact'));

        return $breadcrumb->setLinks($links);
    }
}