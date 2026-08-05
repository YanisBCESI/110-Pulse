<?php

namespace App\Controller;

use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomepageController extends AbstractController{
    #[Route("/", name:"app_hepage")]
    public function main(): Response
    {
        return $this->render('Homepage/homepage.html.twig', []);
    }
}