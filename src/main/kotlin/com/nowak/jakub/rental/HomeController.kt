package com.nowak.jakub.rental
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {

    @GetMapping("/")
    fun home(
        model: Model,
        @AuthenticationPrincipal user: UserDetails?
    ): String {
        model.addAttribute("username", user?.username ?: "Nieznany")
        return "index"
    }
}
