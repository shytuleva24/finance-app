import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLayout } from '@app/layout/auth-layout/auth-layout';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, AuthLayout],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth {}
